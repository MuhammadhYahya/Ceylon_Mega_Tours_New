import { type ChangeEvent, type DragEvent, useCallback, useRef, useState } from "react";
import { Box, Button, Card, Flex, Spinner, Stack, Text } from "@sanity/ui";
import { useToast } from "@sanity/ui/toast";
import { UploadIcon } from "@sanity/icons/Upload";
import { useClient } from "sanity";
import type { AssetSourceComponentProps } from "sanity";
import imageCompression from "browser-image-compression";

/**
 * Ceiling the compressor aims for. A typical phone photo (3–8 MB) lands well
 * under this; it is a target passed to the library's own quality search, not
 * a hard cap — an unusually busy image may finish a little over it rather
 * than being crushed to fit exactly.
 */
const MAX_SIZE_MB = 0.4;

/**
 * Longest edge after resizing. Generous relative to the front end's needs
 * (next.config.ts tops out its deviceSizes at 1920px) so there is still
 * headroom to move the hotspot/crop in the Studio without the source image
 * having been downscaled past what the crop asks for.
 */
const MAX_DIMENSION = 2400;

/** Already this small or smaller — recompressing would only cost quality for no size win. */
const SKIP_BELOW_BYTES = 150 * 1024;

function formatKb(bytes: number) {
  return `${Math.round(bytes / 1024)} КБ`;
}

type Phase =
  | { status: "idle" }
  | { status: "working"; stage: "compressing" | "uploading"; fileName: string }
  | { status: "error"; message: string };

/**
 * The image asset source registered for every image field on the site (see
 * sanity.config.ts) — this fully replaces Sanity's default upload source, so
 * every future upload goes through it with no per-field setup.
 *
 * Compression runs in the browser, before the file ever reaches Sanity's
 * upload endpoint — the point is that the file sitting in Sanity's asset
 * library is already small, not just that the front end re-encodes it on
 * the way out (it already did, via next/image + Sanity's CDN transforms;
 * this is about upload time and storage, which that doesn't touch).
 *
 * `useWebWorker: false` is deliberate: the default *does* work, but it lazy-
 * loads its worker script from a CDN at compression time. Running on the
 * main thread costs a brief, visible pause on a large photo instead — a
 * trade worth making so this keeps working if that CDN is ever slow, blocked
 * on someone's network, or down.
 */
export function CompressedImageSource(props: AssetSourceComponentProps) {
  const { onClose, onSelect } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<Phase>({ status: "idle" });
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.push({ status: "error", title: "Выберите файл изображения" });
        return;
      }

      const originalSize = file.size;
      let toUpload: File = file;

      if (originalSize > SKIP_BELOW_BYTES) {
        setPhase({ status: "working", stage: "compressing", fileName: file.name });
        try {
          toUpload = await imageCompression(file, {
            maxSizeMB: MAX_SIZE_MB,
            maxWidthOrHeight: MAX_DIMENSION,
            useWebWorker: false,
            initialQuality: 0.82,
            fileType: file.type === "image/png" ? "image/png" : "image/jpeg",
          });
        } catch (err) {
          // Compression is a courtesy, not a gate. A file it can't handle —
          // an odd format, a corrupt image — still uploads at full size
          // rather than blocking the editor from publishing at all.
          console.warn("Image compression failed, uploading the original instead:", err);
          toUpload = file;
        }
      }

      setPhase({ status: "working", stage: "uploading", fileName: file.name });
      try {
        const asset = await client.assets.upload("image", toUpload, { filename: file.name });

        const saved =
          toUpload !== file && originalSize > 0
            ? Math.round(100 - (toUpload.size / originalSize) * 100)
            : 0;
        if (saved > 0) {
          toast.push({
            status: "success",
            title: "Фото сжато и загружено",
            description: `${formatKb(originalSize)} → ${formatKb(toUpload.size)}  (−${saved}%)`,
          });
        }

        onSelect([{ kind: "assetDocumentId", value: asset._id }]);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Не удалось загрузить файл";
        setPhase({ status: "error", message });
        toast.push({ status: "error", title: "Загрузка не удалась", description: message });
      }
    },
    [client, onSelect, toast]
  );

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const working = phase.status === "working";

  return (
    <Card padding={4} radius={2}>
      <Stack gap={4}>
        <Text size={1} muted>
          Фото автоматически сжимается в браузере перед загрузкой — большой снимок с
          телефона уменьшается примерно до {Math.round(MAX_SIZE_MB * 1024)} КБ, без заметной
          потери качества.
        </Text>

        <Card
          padding={5}
          radius={2}
          tone={dragOver ? "primary" : "transparent"}
          border
          style={{
            borderStyle: "dashed",
            textAlign: "center",
            cursor: working ? "default" : "pointer",
          }}
          onClick={() => !working && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            if (!working) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={working ? undefined : onDrop}
        >
          <Stack gap={3}>
            {working ? (
              <>
                <Flex justify="center">
                  <Spinner muted />
                </Flex>
                <Text size={1} muted>
                  {phase.stage === "compressing" ? "Сжимаю…" : "Загружаю…"} {phase.fileName}
                </Text>
              </>
            ) : (
              <>
                <Flex justify="center">
                  <Box style={{ fontSize: "1.5rem", lineHeight: 0 }}>
                    <UploadIcon />
                  </Box>
                </Flex>
                <Text size={1}>Перетащите фото сюда или нажмите, чтобы выбрать файл</Text>
              </>
            )}
          </Stack>
        </Card>

        {phase.status === "error" && (
          <Text size={1} style={{ color: "var(--card-critical-fg-color, #d4380d)" }}>
            {phase.message}
          </Text>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onInputChange}
          style={{ display: "none" }}
        />

        <Flex justify="flex-end">
          <Button text="Отмена" mode="ghost" onClick={onClose} disabled={working} />
        </Flex>
      </Stack>
    </Card>
  );
}
