/**
 * Icon choices offered wherever a tour needs one — a programme step, or an
 * item in "Что включено". Only the `value` is stored on the document; the
 * drawing lives in the website's `lib/tourIcons.tsx`, which maps the same
 * keys to components.
 *
 * KEEP IN SYNC with that file. This list is duplicated rather than imported
 * because the Studio is a separate npm project with its own dependencies —
 * it must not pull in the site's React tree. Add here first: the site falls
 * back to a neutral icon for a key it doesn't recognise, so a Studio-first
 * addition degrades gracefully, while a site-first one is simply invisible
 * to editors.
 *
 * Titles are in Russian because that is the language the site is edited in.
 */
export const TOUR_ICON_OPTIONS: { title: string; value: string }[] = [
  // Океан и дикая природа
  { title: "🌊 Волны / океан", value: "waves" },
  { title: "🐟 Рыбы / киты", value: "fish" },
  { title: "🐢 Черепаха", value: "turtle" },
  { title: "🐚 Ракушка", value: "shell" },
  { title: "🦜 Птицы", value: "bird" },
  { title: "🔭 Наблюдение (бинокль)", value: "binoculars" },
  { title: "🔭 Телескоп", value: "telescope" },
  { title: "🚢 Корабль", value: "ship" },
  { title: "⛵ Лодка", value: "sailboat" },
  { title: "⚓ Якорь", value: "anchor" },
  { title: "🛟 Спасательный круг", value: "life-buoy" },

  // Природа и ландшафт
  { title: "⛰️ Горы", value: "mountain" },
  { title: "🌴 Пальма / пляж", value: "palm" },
  { title: "🍃 Лист / природа", value: "leaf" },
  { title: "🌸 Цветок", value: "flower" },
  { title: "☀️ Солнце", value: "sun" },
  { title: "🌅 Рассвет", value: "sunrise" },
  { title: "🌇 Закат", value: "sunset" },
  { title: "⛺ Палатка", value: "tent" },
  { title: "👣 Трекинг", value: "footprints" },
  { title: "☂️ Зонт", value: "umbrella" },
  { title: "💧 Вода", value: "droplet" },

  // Культура и шопинг
  { title: "🏛️ Храм / достопримечательность", value: "landmark" },
  { title: "💎 Драгоценные камни", value: "gem" },
  { title: "📷 Фотостоп", value: "camera" },
  { title: "🛍️ Покупки", value: "shopping-bag" },
  { title: "🧭 Компас", value: "compass" },
  { title: "📍 Точка маршрута", value: "map-pin" },
  { title: "🗺️ Маршрут", value: "route" },
  { title: "✨ Впечатления", value: "sparkles" },
  { title: "⭐ Звезда", value: "star" },

  // Транспорт
  { title: "🚌 Автобус / трансфер", value: "bus" },
  { title: "🚗 Автомобиль", value: "car" },
  { title: "🚆 Поезд", value: "train" },
  { title: "✈️ Самолёт", value: "plane" },

  // Еда, включённое и комфорт
  { title: "🎟️ Входные билеты", value: "ticket" },
  { title: "☕ Чай / кофе", value: "coffee" },
  { title: "🍽️ Обед", value: "utensils" },
  { title: "🍲 Еда", value: "soup" },
  { title: "🍎 Фрукты", value: "apple" },
  { title: "🍇 Виноград", value: "grape" },
  { title: "🥤 Напитки", value: "drink" },
  { title: "🥪 Перекус", value: "sandwich" },
  { title: "💊 Таблетки", value: "pill" },
  { title: "🛡️ Страховка", value: "insurance" },
  { title: "📶 Wi-Fi", value: "wifi" },
  { title: "❄️ Кондиционер", value: "ac" },
  { title: "🛏️ Проживание", value: "bed" },
  { title: "🧑‍🤝‍🧑 Гид / группа", value: "guide" },
  { title: "🕐 Время", value: "clock" },
  { title: "👶 Для детей", value: "baby" },
  { title: "❤️ Забота", value: "heart" },
];
