import type { DayDetail, DayPhoto } from "./dayDetails";

function photos(...rows: DayPhoto[]): DayPhoto[] {
  return rows;
}

/**
 * Day-sheet copy and Wikimedia photographs for overnight hops that touch
 * JAPANRIDE hubs / itineraries. Place names and notes come from that repo;
 * pictures are Commons (JAPANRIDE only has NHK stills, which we do not use).
 */
export const japanRideDayDetails: Record<number, DayDetail> = {
  11: {
    dayN: 11,
    narrative:
      "The last Hokkaidō day runs into the east-meets-west port at Hakodate: brick warehouses on the water, the star fort just inland, and the morning market before the Tsugaru ferry. Kelp-drying villages and dairy country belong to other southern-Hokkaidō roads — this hop is the harbour.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Hakodate from the mountain",
        subtitle: "the port city at the end of the west-coast stage",
        file: "day11-hakodate-night.jpg",
        artist: "MaedaAkihiko",
        license: "CC BY-SA 4.0",
        commons: "https://commons.wikimedia.org/wiki/File:Mount-Hakodate_Night-view.jpg",
        lat: 41.759,
        lng: 140.704,
      },
      {
        n: 2,
        kind: "viewpoint",
        title: "Goryōkaku",
        subtitle: "the star fort inland of the harbour",
        file: "day11-goryokaku.jpg",
        artist: "Goryokaku-Tower",
        license: "CC BY 4.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Hokkaido-Goryokaku_Fort_in_Summer-xl.jpg",
        lat: 41.797,
        lng: 140.754,
      },
      {
        n: 3,
        kind: "breakpoint",
        title: "Kanemori warehouses",
        subtitle: "brick on the water — the east-meets-west mix",
        file: "day11-kanemori.jpg",
        artist: "OraMAAG",
        license: "CC BY 4.0",
        commons: "https://commons.wikimedia.org/wiki/File:Kanemori_Red_Brick_Warehouse.jpg",
        lat: 41.768,
        lng: 140.718,
      },
      {
        n: 4,
        kind: "breakpoint",
        title: "Hakodate morning market",
        subtitle: "before the ferry",
        file: "day11-asaichi.jpg",
        artist: "bryan...",
        license: "CC BY-SA 2.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Hakodate_Morning_Market,_Hakodate_Asaichi,_Hakodate,_2014.jpg",
        lat: 41.773,
        lng: 140.726,
      },
    ),
  },
  12: {
    dayN: 12,
    narrative:
      "Off the ferry at Aomori, then west along the Sea of Japan toward Fukaura and the Gono coast. Not the Tsugaru–Shimokita loop: Hirosaki apples, Cape Tappi, and the sculpted rocks of Hotokegaura sit on other roads from this same city.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Aomori Bay Bridge",
        subtitle: "the harbour we leave, heading west",
        file: "day12-aomori-bay.jpg",
        artist: "掬茶",
        license: "CC BY-SA 4.0",
        commons: "https://commons.wikimedia.org/wiki/File:Aomori_Bay_Bridge_20200621.jpg",
        lat: 40.829,
        lng: 140.742,
      },
      {
        n: 2,
        kind: "viewpoint",
        title: "Gono coast toward Fukaura",
        subtitle: "Sea of Japan side — not Shimokita",
        file: "day12-fukaura.jpg",
        artist: "MaedaAkihiko",
        license: "CC BY-SA 4.0",
        commons: "https://commons.wikimedia.org/wiki/File:JRE-Gono-line_Yukiaizaki.jpg",
        lat: 40.648,
        lng: 139.928,
      },
    ),
  },
  19: {
    dayN: 19,
    narrative:
      "Niigata rice country meets the Sea of Japan at the Bandai Bridge. Sado Island hangs off this harbour by ferry — an island package, not this day's road.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Bandai Bridge",
        subtitle: "Niigata on the water",
        file: "day19-bandai.jpg",
        artist: "Shoestring",
        license: "CC BY-SA 4.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Bandai_Bridge,_Niigata,_Japan_001.JPG",
        lat: 37.92,
        lng: 139.055,
      },
    ),
  },
  21: {
    dayN: 21,
    narrative:
      "The Niigata west coast feeds into Toyama Bay at Uozu, on the official bay cycling course. Buried forest under the dunes; Tateyama's wall across the water. Gokayama's gassho farmhouses and Yatsuo sit inland — off this day's shore.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Uozu buried forest",
        subtitle: "on the Toyama Bay cycling course",
        file: "day21-uozu.jpg",
        artist: "Asturio Cantabrio",
        license: "CC BY-SA 4.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Uozu_Buried_Forest_Museum_ac_(1).jpg",
        lat: 36.822,
        lng: 137.409,
      },
    ),
  },
  22: {
    dayN: 22,
    narrative:
      "West along the bay course past Amaharashi — Tateyama's 3,000 m wall across the water — then onto Chirihama: eight kilometres of rideable sand. The Noto peninsula loop (Wajima market, Suzu salt, Rokkosaki) hangs north of this gate.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Amaharashi Coast",
        subtitle: "Tateyama across Toyama Bay",
        file: "day22-amaharashi.jpg",
        artist: "そらみみ",
        license: "CC BY-SA 4.0",
        commons: "https://commons.wikimedia.org/wiki/File:Amaharashi_Coast_20150122.JPG",
        lat: 36.82,
        lng: 137.051,
      },
      {
        n: 2,
        kind: "viewpoint",
        title: "Chirihama Nagisa Driveway",
        subtitle: "eight km of rideable sand",
        file: "stage-hokuriku.jpg",
        artist: "SONIC BLOOMING",
        license: "CC BY-SA 4.0",
        commons: "https://commons.wikimedia.org/wiki/File:Chirihama_Nagisa_Driveway_2020.jpg",
        lat: 36.861,
        lng: 136.722,
      },
    ),
  },
  23: {
    dayN: 23,
    narrative:
      "Off the sand into the castle-town gate to Noto: Kenrokuen, the castle park, and machiya streets in Higashi Chaya. The peninsula itself is a northbound loop from here, not the cape-to-cape line.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Kenrokuen",
        subtitle: "the castle-town garden",
        file: "day23-kenrokuen.jpg",
        artist: "Balon Greyjoy",
        license: "CC0",
        commons: "https://commons.wikimedia.org/wiki/File:20190705_Kenroku-en-4.jpg",
        lat: 36.562,
        lng: 136.663,
      },
      {
        n: 2,
        kind: "viewpoint",
        title: "Kanazawa Castle",
        subtitle: "gate to Noto",
        file: "day23-castle.jpg",
        artist: "fish0835",
        license: "CC BY-SA 2.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Kanazawa_Castle,_Kanazawa_City;_April_2016_(04).jpg",
        lat: 36.565,
        lng: 136.659,
      },
      {
        n: 5,
        kind: "attraction",
        title: "Higashi Chaya",
        subtitle: "machiya townhouses",
        file: "day23-chaya.jpg",
        artist: "Raita Futo",
        license: "CC BY 2.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Higashi_Chaya_District_(50153812728).jpg",
        lat: 36.572,
        lng: 136.666,
      },
    ),
  },
  24: {
    dayN: 24,
    narrative:
      "Out of Kanazawa along the Fukui coast to Tōjinbō: columnar andesite cliffs on the Sea of Japan. Echizen washi and blades sit inland of this shore.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Tōjinbō cliffs",
        subtitle: "the cut-across leaves the long west coast here",
        file: "stage-cutacross.jpg",
        artist: "雷太",
        license: "CC BY 2.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Tojinbo_cliffs,_Fukui_Prefecture;_September_2019_(01).jpg",
        lat: 36.238,
        lng: 136.125,
      },
      {
        n: 2,
        kind: "viewpoint",
        title: "Tōjinbō, another angle",
        subtitle: "same cliffs, looking along the columns",
        file: "day24-tojinbo.jpg",
        artist: "雷太",
        license: "CC BY 2.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Tojinbo_cliffs,_Fukui_Prefecture;_September_2019_(03).jpg",
        lat: 36.237,
        lng: 136.124,
      },
    ),
  },
  26: {
    dayN: 26,
    narrative:
      "The cut-across arrives at Ōtsu on Lake Biwa, Japan's largest lake. Biwaichi is the official loop of the shore; Chikubu Island and the Shigaraki hills are that loop and its inland climb — this day is the inbound road, not a circumnavigation.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Lake Biwa from Ōtsu",
        subtitle: "the lake the cut-across meets — not the Biwaichi loop",
        file: "day26-biwa.jpg",
        artist: "もんじゃ",
        license: "CC BY-SA 3.0",
        commons: "https://commons.wikimedia.org/wiki/File:Lake_Biwa_viewed_from_Otsu_SA.JPG",
        lat: 35.017,
        lng: 135.855,
      },
    ),
  },
  28: {
    dayN: 28,
    narrative:
      "San’yō riding into Himeji: the keep on the inland-sea side of the line. The old Izumo Highway runs inland of this castle-town.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Himeji Castle",
        subtitle: "the keep on the San’yō coast",
        file: "stage-sanyo.jpg",
        artist: "Reggaeman",
        license: "Public domain",
        commons: "https://commons.wikimedia.org/wiki/File:Himeji_Castle_The_Keep_Towers.jpg",
        lat: 34.839,
        lng: 134.694,
      },
    ),
  },
  30: {
    dayN: 30,
    narrative:
      "Okayama to Onomichi: temple slope, channel, and the mainland gate to the Shimanami Kaido. The bridges to Innoshima, Setoda, and Imabari leave from here — that island-hop is off the land line.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Onomichi from Senkō-ji",
        subtitle: "the temple-slope town",
        file: "day30-onomichi.jpg",
        artist: "Shinkansen",
        license: "CC BY-SA 3.0",
        commons: "https://commons.wikimedia.org/wiki/File:Onomichi_from_Senko-ji.jpg",
        lat: 34.412,
        lng: 133.199,
      },
      {
        n: 2,
        kind: "viewpoint",
        title: "Onomichi Channel",
        subtitle: "mainland water, before the bridges",
        file: "day30-channel.jpg",
        artist: "Suicasmo",
        license: "CC BY-SA 4.0",
        commons: "https://commons.wikimedia.org/wiki/File:Onomichi_Channel_20190323.jpg",
        lat: 34.404,
        lng: 133.195,
      },
      {
        n: 5,
        kind: "attraction",
        title: "Tatara Bridge, Shimanami",
        subtitle: "the island-hop off this town — not the cape-to-cape road",
        file: "day30-shimanami.jpg",
        artist: "Fabimaru",
        license: "CC BY-SA 4.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Shimanami_kaidō_to_Tatara_Bridge.jpg",
        lat: 34.26,
        lng: 133.05,
      },
    ),
  },
  32: {
    dayN: 32,
    narrative:
      "Kure to Yanai along the Inland Sea: Iwakuni's Kintaikyō sits on this coast, then Yanai's white-wall goldfish streets. Iwaishima and Hagi are offshore and further west — nearby, not this hop's GPS.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Kintaikyō, Iwakuni",
        subtitle: "on the San’yō coast between Kure and Yanai",
        file: "day32-kintai.jpg",
        artist: "Jakub Hałun",
        license: "CC BY-SA 4.0",
        commons: "https://commons.wikimedia.org/wiki/File:20100724_Iwakuni_5235.jpg",
        lat: 34.167,
        lng: 132.178,
      },
      {
        n: 3,
        kind: "breakpoint",
        title: "Yanai white-wall street",
        subtitle: "goldfish lantern town at the overnight",
        file: "day32-yanai.jpg",
        artist: "Suhobei",
        license: "Public domain",
        commons: "https://commons.wikimedia.org/wiki/File:Yanai_White_Wall.JPG",
        lat: 33.964,
        lng: 132.102,
      },
    ),
  },
  36: {
    dayN: 36,
    narrative:
      "Usa to Usuki: the castle town and the stone Buddhas sit on this east-coast hop. Beppu's onsen is just north of the previous day; the Yamanami Highway to Yufuin is inland and off this road.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Usuki stone Buddhas",
        subtitle: "on the east-coast overnight",
        file: "day36-usuki.jpg",
        artist: "Wiiii",
        license: "CC BY-SA 3.0",
        commons: "https://commons.wikimedia.org/wiki/File:Usuki_Stone_Buddhas.jpg",
        lat: 33.148,
        lng: 131.728,
      },
      {
        n: 5,
        kind: "attraction",
        title: "Beppu Umi-jigoku",
        subtitle: "onsen capital just north of this hop — not Yamanami",
        file: "stage-kyushu.jpg",
        artist: "663highland",
        license: "CC BY 2.5",
        commons: "https://commons.wikimedia.org/wiki/File:Beppu_Umi-jigoku04n4272.jpg",
        lat: 33.317,
        lng: 131.477,
      },
    ),
  },
  42: {
    dayN: 42,
    narrative:
      "After Cape Sata, the Satsuma run-in to Kagoshima looks across the water at Sakurajima. Black vinegar country sits in the same basin; this day is the port.",
    photos: photos(
      {
        n: 1,
        kind: "viewpoint",
        title: "Sakurajima from the city",
        subtitle: "the volcano across Kagoshima Bay",
        file: "stage-satsuma.jpg",
        artist: "TANAKA Juuyoh",
        license: "CC BY 2.0",
        commons: "https://commons.wikimedia.org/wiki/File:Sakurajima55.jpg",
        lat: 31.59,
        lng: 130.66,
      },
      {
        n: 2,
        kind: "viewpoint",
        title: "Sakurajima from the port",
        subtitle: "the run-in finishes on the water",
        file: "day42-sakurajima-port.jpg",
        artist: "そらみみ",
        license: "CC BY-SA 3.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Mount_Sakurajima_from_Kagoshima_Port.JPG",
        lat: 31.597,
        lng: 130.557,
      },
    ),
  },
};
