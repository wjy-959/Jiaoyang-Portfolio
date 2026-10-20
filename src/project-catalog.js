import {mapPublicAssets} from './published-state';
// Local project catalog. Image roles are visually audited; keep keys and source paths stable to preserve browser edits.
const rawData = [
  {
    "id": "06",
    "slug": "36v-battery",
    "accent": "36V",
    "name": "锂电池",
    "mergeFirstTwo": false,
    "platform": "Amazon 亚马逊",
    "displayName": "36V 锂电池",
    "title": "36V 锂电池 · Amazon Listing",
    "detailPath": "/projects/36v-battery",
    "cover": "/images/projects/36v-battery/aplus-02.webp",
    "listingRatio": "1:1",
    "listing": [
      {
        "key": "36v-battery-listing-03",
        "src": "/images/projects/36v-battery/listing-03.webp",
        "label": "Listing 主图 03",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/36v-battery/previews/listing-03.webp"
      },
      {
        "key": "36v-battery-listing-04",
        "src": "/images/projects/36v-battery/listing-04.webp",
        "label": "Listing 主图 04",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/36v-battery/previews/listing-04.webp"
      },
      {
        "key": "36v-battery-listing-05",
        "src": "/images/projects/36v-battery/listing-05.webp",
        "label": "Listing 主图 05",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/36v-battery/previews/listing-05.webp"
      },
      {
        "key": "36v-battery-listing-06",
        "src": "/images/projects/36v-battery/listing-06.webp",
        "label": "Listing 主图 06",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/36v-battery/previews/listing-06.webp"
      },
      {
        "key": "36v-battery-listing-07",
        "src": "/images/projects/36v-battery/listing-07.webp",
        "label": "Listing 主图 07",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/36v-battery/previews/listing-07.webp"
      },
      {
        "key": "36v-battery-listing-08",
        "src": "/images/projects/36v-battery/listing-08.webp",
        "label": "Listing 主图 08",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/36v-battery/previews/listing-08.webp"
      },
      {
        "key": "36v-battery-listing-09",
        "src": "/images/projects/36v-battery/listing-09.webp",
        "label": "Listing 主图 09",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/36v-battery/previews/listing-09.webp"
      },
      {
        "key": "36v-battery-listing-10",
        "src": "/images/projects/36v-battery/listing-10.webp",
        "label": "Listing 主图 10",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/36v-battery/previews/listing-10.webp"
      },
      {
        "key": "36v-battery-listing-11",
        "src": "/images/projects/36v-battery/listing-11.webp",
        "label": "Listing 主图 11",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/36v-battery/previews/listing-11.webp"
      },
      {
        "key": "36v-battery-listing-12",
        "src": "/images/projects/36v-battery/listing-12.webp",
        "label": "Listing 主图 12",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/36v-battery/previews/listing-12.webp"
      }
    ],
    "aplus": [
      {
        "key": "36v-battery-aplus-01",
        "src": "/images/projects/36v-battery/aplus-01.webp",
        "label": "A+ 视觉 01",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/36v-battery/previews/aplus-01.webp"
      },
      {
        "key": "36v-battery-aplus-02",
        "src": "/images/projects/36v-battery/aplus-02.webp",
        "label": "A+ 视觉 02",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/36v-battery/previews/aplus-02.webp"
      },
      {
        "key": "36v-battery-aplus-03",
        "src": "/images/projects/36v-battery/aplus-03.webp",
        "label": "A+ 视觉 03",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/36v-battery/previews/aplus-03.webp"
      },
      {
        "key": "36v-battery-aplus-04",
        "src": "/images/projects/36v-battery/aplus-04.webp",
        "label": "A+ 视觉 04",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/36v-battery/previews/aplus-04.webp"
      },
      {
        "key": "36v-battery-aplus-05",
        "src": "/images/projects/36v-battery/aplus-05.webp",
        "label": "A+ 视觉 05",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/36v-battery/previews/aplus-05.webp"
      },
      {
        "key": "36v-battery-aplus-06",
        "src": "/images/projects/36v-battery/aplus-06.webp",
        "label": "A+ 视觉 06",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/36v-battery/previews/aplus-06.webp"
      },
      {
        "key": "36v-battery-aplus-07",
        "src": "/images/projects/36v-battery/aplus-07.webp",
        "label": "A+ 视觉 07",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/36v-battery/previews/aplus-07.webp"
      },
      {
        "key": "36v-battery-aplus-08",
        "src": "/images/projects/36v-battery/aplus-08.webp",
        "label": "A+ 视觉 08",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/36v-battery/previews/aplus-08.webp"
      },
      {
        "key": "36v-battery-aplus-09",
        "src": "/images/projects/36v-battery/aplus-09.webp",
        "label": "A+ 视觉 09",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/36v-battery/previews/aplus-09.webp"
      }
    ],
    "products": [
      {
        "key": "36v-battery-listing-01",
        "src": "/images/projects/36v-battery/listing-01.webp",
        "label": "产品白底图 01",
        "width": 1600,
        "height": 1600,
        "type": "product",
        "preview": "/images/projects/36v-battery/previews/listing-01.webp"
      },
      {
        "key": "36v-battery-listing-02",
        "src": "/images/projects/36v-battery/listing-02.webp",
        "label": "产品白底图 02",
        "width": 1600,
        "height": 1600,
        "type": "product",
        "preview": "/images/projects/36v-battery/previews/listing-02.webp"
      }
    ],
    "displayIndex": "02",
    "kind": "listing",
    "category": "Listing设计",
    "thumbnail": "/images/projects/36v-battery/thumbnail.webp",
    "featuredImageKey": "36v-battery-listing-05"
  },
  {
    "id": "08",
    "slug": "inverter",
    "accent": "逆变器",
    "name": "",
    "mergeFirstTwo": false,
    "platform": "Amazon 亚马逊",
    "displayName": "逆变器",
    "title": "逆变器 · Amazon Listing",
    "detailPath": "/projects/inverter",
    "cover": "/images/projects/inverter/aplus-01.webp",
    "listingRatio": "1:1",
    "listing": [
      {
        "key": "inverter-listing-03",
        "src": "/images/projects/inverter/listing-03.webp",
        "label": "Listing 主图 03",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/inverter/previews/listing-03.webp"
      },
      {
        "key": "inverter-listing-04",
        "src": "/images/projects/inverter/listing-04.webp",
        "label": "Listing 主图 04",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/inverter/previews/listing-04.webp"
      },
      {
        "key": "inverter-listing-05",
        "src": "/images/projects/inverter/listing-05.webp",
        "label": "Listing 主图 05",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/inverter/previews/listing-05.webp"
      },
      {
        "key": "inverter-listing-06",
        "src": "/images/projects/inverter/listing-06.webp",
        "label": "Listing 主图 06",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/inverter/previews/listing-06.webp"
      },
      {
        "key": "inverter-listing-07",
        "src": "/images/projects/inverter/listing-07.webp",
        "label": "Listing 主图 07",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/inverter/previews/listing-07.webp"
      },
      {
        "key": "inverter-listing-08",
        "src": "/images/projects/inverter/listing-08.webp",
        "label": "Listing 主图 08",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/inverter/previews/listing-08.webp"
      },
      {
        "key": "inverter-listing-09",
        "src": "/images/projects/inverter/listing-09.webp",
        "label": "Listing 主图 09",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/inverter/previews/listing-09.webp"
      },
      {
        "key": "inverter-listing-10",
        "src": "/images/projects/inverter/listing-10.webp",
        "label": "Listing 主图 10",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/inverter/previews/listing-10.webp"
      }
    ],
    "aplus": [
      {
        "key": "inverter-aplus-01",
        "src": "/images/projects/inverter/aplus-01.webp",
        "label": "A+ 视觉 01",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-01.webp"
      },
      {
        "key": "inverter-aplus-02",
        "src": "/images/projects/inverter/aplus-02.webp",
        "label": "A+ 视觉 02",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-02.webp"
      },
      {
        "key": "inverter-aplus-03",
        "src": "/images/projects/inverter/aplus-03.webp",
        "label": "A+ 视觉 03",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-03.webp"
      },
      {
        "key": "inverter-aplus-04",
        "src": "/images/projects/inverter/aplus-04.webp",
        "label": "A+ 视觉 04",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-04.webp"
      },
      {
        "key": "inverter-aplus-05",
        "src": "/images/projects/inverter/aplus-05.webp",
        "label": "A+ 视觉 05",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-05.webp"
      },
      {
        "key": "inverter-aplus-06",
        "src": "/images/projects/inverter/aplus-06.webp",
        "label": "A+ 视觉 06",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-06.webp"
      },
      {
        "key": "inverter-aplus-07",
        "src": "/images/projects/inverter/aplus-07.webp",
        "label": "A+ 视觉 07",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-07.webp"
      },
      {
        "key": "inverter-aplus-08",
        "src": "/images/projects/inverter/aplus-08.webp",
        "label": "A+ 视觉 08",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-08.webp"
      },
      {
        "key": "inverter-aplus-09",
        "src": "/images/projects/inverter/aplus-09.webp",
        "label": "A+ 视觉 09",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-09.webp"
      },
      {
        "key": "inverter-aplus-10",
        "src": "/images/projects/inverter/aplus-10.webp",
        "label": "A+ 视觉 10",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-10.webp"
      },
      {
        "key": "inverter-aplus-11",
        "src": "/images/projects/inverter/aplus-11.webp",
        "label": "A+ 视觉 11",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-11.webp"
      },
      {
        "key": "inverter-aplus-12",
        "src": "/images/projects/inverter/aplus-12.webp",
        "label": "A+ 视觉 12",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-12.webp"
      },
      {
        "key": "inverter-aplus-13",
        "src": "/images/projects/inverter/aplus-13.webp",
        "label": "A+ 视觉 13",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/inverter/previews/aplus-13.webp"
      }
    ],
    "products": [
      {
        "key": "inverter-listing-01",
        "src": "/images/projects/inverter/listing-01.webp",
        "label": "产品白底图 01",
        "width": 1000,
        "height": 1000,
        "type": "product",
        "preview": "/images/projects/inverter/previews/listing-01.webp"
      },
      {
        "key": "inverter-listing-02",
        "src": "/images/projects/inverter/listing-02.webp",
        "label": "产品白底图 02",
        "width": 1000,
        "height": 1000,
        "type": "product",
        "preview": "/images/projects/inverter/previews/listing-02.webp"
      }
    ],
    "displayIndex": "01",
    "kind": "listing",
    "category": "Listing设计",
    "thumbnail": "/images/projects/inverter/thumbnail.webp",
    "featuredImageKey": "inverter-listing-06"
  },
  {
    "id": "01",
    "slug": "24v-charger",
    "accent": "24V",
    "name": "充电器",
    "mergeFirstTwo": true,
    "platform": "Amazon 亚马逊",
    "displayName": "24V 充电器",
    "title": "24V 充电器 · Amazon Listing",
    "detailPath": "/projects/24v-charger",
    "cover": "/images/projects/24v-charger/aplus-01.webp",
    "listingRatio": "4:5",
    "listing": [
      {
        "key": "charger-listing-01",
        "src": "/images/projects/24v-charger/listing-01.webp",
        "label": "Listing 主图 01",
        "width": 1600,
        "height": 2000,
        "type": "listing",
        "preview": "/images/projects/24v-charger/previews/listing-01.webp"
      },
      {
        "key": "charger-listing-02",
        "src": "/images/projects/24v-charger/listing-02.webp",
        "label": "Listing 主图 02",
        "width": 1600,
        "height": 2000,
        "type": "listing",
        "preview": "/images/projects/24v-charger/previews/listing-02.webp"
      },
      {
        "key": "charger-listing-03",
        "src": "/images/projects/24v-charger/listing-03.webp",
        "label": "Listing 主图 03",
        "width": 1600,
        "height": 2000,
        "type": "listing",
        "preview": "/images/projects/24v-charger/previews/listing-03.webp"
      },
      {
        "key": "charger-listing-04",
        "src": "/images/projects/24v-charger/listing-04.webp",
        "label": "Listing 主图 04",
        "width": 1600,
        "height": 2000,
        "type": "listing",
        "preview": "/images/projects/24v-charger/previews/listing-04.webp"
      },
      {
        "key": "charger-listing-05",
        "src": "/images/projects/24v-charger/listing-05.webp",
        "label": "Listing 主图 05",
        "width": 1600,
        "height": 2000,
        "type": "listing",
        "preview": "/images/projects/24v-charger/previews/listing-05.webp"
      },
      {
        "key": "charger-listing-06",
        "src": "/images/projects/24v-charger/listing-06.webp",
        "label": "Listing 主图 06",
        "width": 1600,
        "height": 2000,
        "type": "listing",
        "preview": "/images/projects/24v-charger/previews/listing-06.webp"
      },
      {
        "key": "charger-listing-07",
        "src": "/images/projects/24v-charger/listing-07.webp",
        "label": "Listing 主图 07",
        "width": 1600,
        "height": 2000,
        "type": "listing",
        "preview": "/images/projects/24v-charger/previews/listing-07.webp"
      },
      {
        "key": "charger-listing-08",
        "src": "/images/projects/24v-charger/listing-08.webp",
        "label": "Listing 主图 08",
        "width": 1600,
        "height": 2000,
        "type": "listing",
        "preview": "/images/projects/24v-charger/previews/listing-08.webp"
      },
      {
        "key": "charger-listing-09",
        "src": "/images/projects/24v-charger/listing-09.webp",
        "label": "Listing 主图 09",
        "width": 1600,
        "height": 2000,
        "type": "listing",
        "preview": "/images/projects/24v-charger/previews/listing-09.webp"
      }
    ],
    "aplus": [
      {
        "key": "charger-aplus-01",
        "src": "/images/projects/24v-charger/aplus-01.webp",
        "label": "A+ 视觉 01",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-01.webp"
      },
      {
        "key": "charger-aplus-02",
        "src": "/images/projects/24v-charger/aplus-02.webp",
        "label": "A+ 视觉 02",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-02.webp"
      },
      {
        "key": "charger-aplus-03",
        "src": "/images/projects/24v-charger/aplus-03.webp",
        "label": "A+ 视觉 03",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-03.webp"
      },
      {
        "key": "charger-aplus-04",
        "src": "/images/projects/24v-charger/aplus-04.webp",
        "label": "A+ 视觉 04",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-04.webp"
      },
      {
        "key": "charger-aplus-05",
        "src": "/images/projects/24v-charger/aplus-05.webp",
        "label": "A+ 视觉 05",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-05.webp"
      },
      {
        "key": "charger-aplus-06",
        "src": "/images/projects/24v-charger/aplus-06.webp",
        "label": "A+ 视觉 06",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-06.webp"
      },
      {
        "key": "charger-aplus-07",
        "src": "/images/projects/24v-charger/aplus-07.webp",
        "label": "A+ 视觉 07",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-07.webp"
      },
      {
        "key": "charger-aplus-08",
        "src": "/images/projects/24v-charger/aplus-08.webp",
        "label": "A+ 视觉 08",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-08.webp"
      },
      {
        "key": "charger-aplus-09",
        "src": "/images/projects/24v-charger/aplus-09.webp",
        "label": "A+ 视觉 09",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-09.webp"
      },
      {
        "key": "charger-aplus-10",
        "src": "/images/projects/24v-charger/aplus-10.webp",
        "label": "A+ 视觉 10",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-10.webp"
      },
      {
        "key": "charger-aplus-11",
        "src": "/images/projects/24v-charger/aplus-11.webp",
        "label": "A+ 视觉 11",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-11.webp"
      },
      {
        "key": "charger-aplus-12",
        "src": "/images/projects/24v-charger/aplus-12.webp",
        "label": "A+ 视觉 12",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-12.webp"
      },
      {
        "key": "charger-aplus-13",
        "src": "/images/projects/24v-charger/aplus-13.webp",
        "label": "A+ 视觉 13",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/24v-charger/previews/aplus-13.webp"
      }
    ],
    "products": [
      {
        "key": "charger-product-01",
        "src": "/images/projects/24v-charger/product-01.webp",
        "label": "产品白底图 01",
        "width": 2000,
        "height": 2000,
        "type": "product",
        "preview": "/images/projects/24v-charger/previews/product-01.webp"
      },
      {
        "key": "charger-product-02",
        "src": "/images/projects/24v-charger/product-02.webp",
        "label": "产品白底图 02",
        "width": 2000,
        "height": 2000,
        "type": "product",
        "preview": "/images/projects/24v-charger/previews/product-02.webp"
      },
      {
        "key": "charger-product-03",
        "src": "/images/projects/24v-charger/product-03.webp",
        "label": "产品白底图 03",
        "width": 2000,
        "height": 2000,
        "type": "product",
        "preview": "/images/projects/24v-charger/previews/product-03.webp"
      }
    ],
    "displayIndex": "03",
    "kind": "listing",
    "category": "Listing设计",
    "thumbnail": "/images/projects/24v-charger/thumbnail.webp",
    "featuredImageKey": "charger-listing-02"
  },
  {
    "id": "05",
    "slug": "12v-battery",
    "accent": "12V",
    "name": "锂电池",
    "mergeFirstTwo": false,
    "platform": "Amazon 亚马逊",
    "displayName": "12V 锂电池",
    "title": "12V 锂电池 · Amazon Listing",
    "detailPath": "/projects/12v-battery",
    "cover": "/images/projects/12v-battery/aplus-01.webp",
    "listingRatio": "1:1",
    "listing": [
      {
        "key": "12v-battery-listing-03",
        "src": "/images/projects/12v-battery/listing-03.webp",
        "label": "Listing 主图 03",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/12v-battery/previews/listing-03.webp"
      },
      {
        "key": "12v-battery-listing-04",
        "src": "/images/projects/12v-battery/listing-04.webp",
        "label": "Listing 主图 04",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/12v-battery/previews/listing-04.webp"
      },
      {
        "key": "12v-battery-listing-05",
        "src": "/images/projects/12v-battery/listing-05.webp",
        "label": "Listing 主图 05",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/12v-battery/previews/listing-05.webp"
      },
      {
        "key": "12v-battery-listing-06",
        "src": "/images/projects/12v-battery/listing-06.webp",
        "label": "Listing 主图 06",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/12v-battery/previews/listing-06.webp"
      },
      {
        "key": "12v-battery-listing-07",
        "src": "/images/projects/12v-battery/listing-07.webp",
        "label": "Listing 主图 07",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/12v-battery/previews/listing-07.webp"
      },
      {
        "key": "12v-battery-listing-08",
        "src": "/images/projects/12v-battery/listing-08.webp",
        "label": "Listing 主图 08",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/12v-battery/previews/listing-08.webp"
      },
      {
        "key": "12v-battery-listing-09",
        "src": "/images/projects/12v-battery/listing-09.webp",
        "label": "Listing 主图 09",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/12v-battery/previews/listing-09.webp"
      },
      {
        "key": "12v-battery-listing-10",
        "src": "/images/projects/12v-battery/listing-10.webp",
        "label": "Listing 主图 10",
        "width": 1000,
        "height": 1000,
        "type": "listing",
        "preview": "/images/projects/12v-battery/previews/listing-10.webp"
      }
    ],
    "aplus": [
      {
        "key": "12v-battery-aplus-01",
        "src": "/images/projects/12v-battery/aplus-01.webp",
        "label": "A+ 视觉 01",
        "width": 2560,
        "height": 2098,
        "type": "aplus",
        "preview": "/images/projects/12v-battery/previews/aplus-01.webp"
      },
      {
        "key": "12v-battery-aplus-02",
        "src": "/images/projects/12v-battery/aplus-02.webp",
        "label": "A+ 视觉 02",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/12v-battery/previews/aplus-02.webp"
      },
      {
        "key": "12v-battery-aplus-03",
        "src": "/images/projects/12v-battery/aplus-03.webp",
        "label": "A+ 视觉 03",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/12v-battery/previews/aplus-03.webp"
      },
      {
        "key": "12v-battery-aplus-04",
        "src": "/images/projects/12v-battery/aplus-04.webp",
        "label": "A+ 视觉 04",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/12v-battery/previews/aplus-04.webp"
      },
      {
        "key": "12v-battery-aplus-05",
        "src": "/images/projects/12v-battery/aplus-05.webp",
        "label": "A+ 视觉 05",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/12v-battery/previews/aplus-05.webp"
      },
      {
        "key": "12v-battery-aplus-06",
        "src": "/images/projects/12v-battery/aplus-06.webp",
        "label": "A+ 视觉 06",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/12v-battery/previews/aplus-06.webp"
      },
      {
        "key": "12v-battery-aplus-07",
        "src": "/images/projects/12v-battery/aplus-07.webp",
        "label": "A+ 视觉 07",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/12v-battery/previews/aplus-07.webp"
      },
      {
        "key": "12v-battery-aplus-08",
        "src": "/images/projects/12v-battery/aplus-08.webp",
        "label": "A+ 视觉 08",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/12v-battery/previews/aplus-08.webp"
      },
      {
        "key": "12v-battery-aplus-09",
        "src": "/images/projects/12v-battery/aplus-09.webp",
        "label": "A+ 视觉 09",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/12v-battery/previews/aplus-09.webp"
      }
    ],
    "products": [
      {
        "key": "12v-battery-listing-01",
        "src": "/images/projects/12v-battery/listing-01.webp",
        "label": "产品白底图 01",
        "width": 1000,
        "height": 1000,
        "type": "product",
        "preview": "/images/projects/12v-battery/previews/listing-01.webp"
      },
      {
        "key": "12v-battery-listing-02",
        "src": "/images/projects/12v-battery/listing-02.webp",
        "label": "产品白底图 02",
        "width": 1000,
        "height": 1000,
        "type": "product",
        "preview": "/images/projects/12v-battery/previews/listing-02.webp"
      }
    ],
    "displayIndex": "04",
    "kind": "listing",
    "category": "Listing设计",
    "thumbnail": "/images/projects/12v-battery/thumbnail.webp",
    "featuredImageKey": "12v-battery-listing-04"
  },
  {
    "id": "07",
    "slug": "electric-outboard",
    "accent": "电动",
    "name": "舷外机",
    "mergeFirstTwo": false,
    "platform": "Amazon 亚马逊 / 独立站",
    "displayName": "电动舷外机",
    "title": "电动舷外机 · Amazon Listing",
    "detailPath": "/projects/electric-outboard",
    "cover": "/images/projects/electric-outboard/aplus-01.webp",
    "listingRatio": "1:1",
    "listing": [
      {
        "key": "electric-outboard-listing-03",
        "src": "/images/projects/electric-outboard/listing-03.webp",
        "label": "Listing 主图 03",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/electric-outboard/previews/listing-03.webp"
      },
      {
        "key": "electric-outboard-listing-04",
        "src": "/images/projects/electric-outboard/listing-04.webp",
        "label": "Listing 主图 04",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/electric-outboard/previews/listing-04.webp"
      },
      {
        "key": "electric-outboard-listing-05",
        "src": "/images/projects/electric-outboard/listing-05.webp",
        "label": "Listing 主图 05",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/electric-outboard/previews/listing-05.webp"
      },
      {
        "key": "electric-outboard-listing-06",
        "src": "/images/projects/electric-outboard/listing-06.webp",
        "label": "Listing 主图 06",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/electric-outboard/previews/listing-06.webp"
      },
      {
        "key": "electric-outboard-listing-07",
        "src": "/images/projects/electric-outboard/listing-07.webp",
        "label": "Listing 主图 07",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/electric-outboard/previews/listing-07.webp"
      },
      {
        "key": "electric-outboard-listing-08",
        "src": "/images/projects/electric-outboard/listing-08.webp",
        "label": "Listing 主图 08",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/electric-outboard/previews/listing-08.webp"
      },
      {
        "key": "electric-outboard-listing-09",
        "src": "/images/projects/electric-outboard/listing-09.webp",
        "label": "Listing 主图 09",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/electric-outboard/previews/listing-09.webp"
      },
      {
        "key": "electric-outboard-listing-10",
        "src": "/images/projects/electric-outboard/listing-10.webp",
        "label": "Listing 主图 10",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/electric-outboard/previews/listing-10.webp"
      },
      {
        "key": "electric-outboard-listing-11",
        "src": "/images/projects/electric-outboard/listing-11.webp",
        "label": "Listing 主图 11",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/electric-outboard/previews/listing-11.webp"
      },
      {
        "key": "electric-outboard-listing-12",
        "src": "/images/projects/electric-outboard/listing-12.webp",
        "label": "Listing 主图 12",
        "width": 1600,
        "height": 1600,
        "type": "listing",
        "preview": "/images/projects/electric-outboard/previews/listing-12.webp"
      }
    ],
    "aplus": [
      {
        "key": "electric-outboard-aplus-01",
        "src": "/images/projects/electric-outboard/aplus-01.webp",
        "label": "A+ 视觉 01",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/electric-outboard/previews/aplus-01.webp"
      },
      {
        "key": "electric-outboard-aplus-02",
        "src": "/images/projects/electric-outboard/aplus-02.webp",
        "label": "A+ 视觉 02",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/electric-outboard/previews/aplus-02.webp"
      },
      {
        "key": "electric-outboard-aplus-03",
        "src": "/images/projects/electric-outboard/aplus-03.webp",
        "label": "A+ 视觉 03",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/electric-outboard/previews/aplus-03.webp"
      },
      {
        "key": "electric-outboard-aplus-04",
        "src": "/images/projects/electric-outboard/aplus-04.webp",
        "label": "A+ 视觉 04",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/electric-outboard/previews/aplus-04.webp"
      },
      {
        "key": "electric-outboard-aplus-05",
        "src": "/images/projects/electric-outboard/aplus-05.webp",
        "label": "A+ 视觉 05",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/electric-outboard/previews/aplus-05.webp"
      },
      {
        "key": "electric-outboard-aplus-06",
        "src": "/images/projects/electric-outboard/aplus-06.webp",
        "label": "A+ 视觉 06",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/electric-outboard/previews/aplus-06.webp"
      },
      {
        "key": "electric-outboard-aplus-07",
        "src": "/images/projects/electric-outboard/aplus-07.webp",
        "label": "A+ 视觉 07",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/electric-outboard/previews/aplus-07.webp"
      },
      {
        "key": "electric-outboard-aplus-08",
        "src": "/images/projects/electric-outboard/aplus-08.webp",
        "label": "A+ 视觉 08",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/electric-outboard/previews/aplus-08.webp"
      },
      {
        "key": "electric-outboard-aplus-09",
        "src": "/images/projects/electric-outboard/aplus-09.webp",
        "label": "A+ 视觉 09",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/electric-outboard/previews/aplus-09.webp"
      },
      {
        "key": "electric-outboard-aplus-10",
        "src": "/images/projects/electric-outboard/aplus-10.webp",
        "label": "A+ 视觉 10",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/electric-outboard/previews/aplus-10.webp"
      },
      {
        "key": "electric-outboard-aplus-11",
        "src": "/images/projects/electric-outboard/aplus-11.webp",
        "label": "A+ 视觉 11",
        "width": 2560,
        "height": 1049,
        "type": "aplus",
        "preview": "/images/projects/electric-outboard/previews/aplus-11.webp"
      }
    ],
    "products": [
      {
        "key": "electric-outboard-listing-01",
        "src": "/images/projects/electric-outboard/listing-01.webp",
        "label": "产品白底图 01",
        "width": 1600,
        "height": 1600,
        "type": "product",
        "preview": "/images/projects/electric-outboard/previews/listing-01.webp"
      },
      {
        "key": "electric-outboard-listing-02",
        "src": "/images/projects/electric-outboard/listing-02.webp",
        "label": "产品白底图 02",
        "width": 1600,
        "height": 1600,
        "type": "product",
        "preview": "/images/projects/electric-outboard/previews/listing-02.webp"
      }
    ],
    "displayIndex": "05",
    "kind": "listing",
    "category": "Listing设计",
    "thumbnail": "/images/projects/electric-outboard/thumbnail.webp",
    "featuredImageKey": "electric-outboard-listing-06",
    "posters": [
      {
        "key": "electric-outboard-poster-01",
        "src": "/images/projects/electric-outboard/poster-01.webp",
        "preview": "/images/projects/electric-outboard/previews/poster-01.webp",
        "label": "项目海报 01",
        "width": 1280,
        "height": 720,
        "type": "poster"
      },
      {
        "key": "electric-outboard-poster-02",
        "src": "/images/projects/electric-outboard/poster-02.webp",
        "preview": "/images/projects/electric-outboard/previews/poster-02.webp",
        "label": "项目海报 02",
        "width": 1280,
        "height": 720,
        "type": "poster"
      }
    ]
  },
  {
    "id": "09",
    "slug": "energy-selection",
    "accent": "储能",
    "name": "工作图节选",
    "displayName": "储能工作图节选",
    "title": "储能工作图节选",
    "detailPath": "/projects/energy-selection",
    "cover": "/images/projects/energy-selection/visual-25.webp",
    "listingRatio": "ORIGINAL FORMAT",
    "listing": [
      {
        "key": "energy-selection-visual-01",
        "src": "/images/projects/energy-selection/visual-01.webp",
        "label": "工作图 01",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-01.webp"
      },
      {
        "key": "energy-selection-visual-02",
        "src": "/images/projects/energy-selection/visual-02.webp",
        "label": "工作图 02",
        "width": 2885,
        "height": 1202,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-02.webp"
      },
      {
        "key": "energy-selection-visual-03",
        "src": "/images/projects/energy-selection/visual-03.webp",
        "label": "工作图 03",
        "width": 3840,
        "height": 1800,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-03.webp"
      },
      {
        "key": "energy-selection-visual-04",
        "src": "/images/projects/energy-selection/visual-04.webp",
        "label": "工作图 04",
        "width": 3840,
        "height": 1800,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-04.webp"
      },
      {
        "key": "energy-selection-visual-05",
        "src": "/images/projects/energy-selection/visual-05.webp",
        "label": "工作图 05",
        "width": 3840,
        "height": 1800,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-05.webp"
      },
      {
        "key": "energy-selection-visual-06",
        "src": "/images/projects/energy-selection/visual-06.webp",
        "label": "工作图 06",
        "width": 3840,
        "height": 1800,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-06.webp"
      },
      {
        "key": "energy-selection-visual-07",
        "src": "/images/projects/energy-selection/visual-07.webp",
        "label": "工作图 07",
        "width": 3840,
        "height": 1800,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-07.webp"
      },
      {
        "key": "energy-selection-visual-08",
        "src": "/images/projects/energy-selection/visual-08.webp",
        "label": "工作图 08",
        "width": 3840,
        "height": 1800,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-08.webp"
      },
      {
        "key": "energy-selection-visual-09",
        "src": "/images/projects/energy-selection/visual-09.webp",
        "label": "工作图 09",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-09.webp"
      },
      {
        "key": "energy-selection-visual-10",
        "src": "/images/projects/energy-selection/visual-10.webp",
        "label": "工作图 10",
        "width": 1920,
        "height": 800,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-10.webp"
      },
      {
        "key": "energy-selection-visual-11",
        "src": "/images/projects/energy-selection/visual-11.webp",
        "label": "工作图 11",
        "width": 1920,
        "height": 800,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-11.webp"
      },
      {
        "key": "energy-selection-visual-12",
        "src": "/images/projects/energy-selection/visual-12.webp",
        "label": "工作图 12",
        "width": 3000,
        "height": 1500,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-12.webp"
      },
      {
        "key": "energy-selection-visual-13",
        "src": "/images/projects/energy-selection/visual-13.webp",
        "label": "工作图 13",
        "width": 2852,
        "height": 1292,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-13.webp"
      },
      {
        "key": "energy-selection-visual-14",
        "src": "/images/projects/energy-selection/visual-14.webp",
        "label": "工作图 14",
        "width": 2000,
        "height": 2000,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-14.webp"
      },
      {
        "key": "energy-selection-visual-15",
        "src": "/images/projects/energy-selection/visual-15.webp",
        "label": "工作图 15",
        "width": 1600,
        "height": 1599,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-15.webp"
      },
      {
        "key": "energy-selection-visual-16",
        "src": "/images/projects/energy-selection/visual-16.webp",
        "label": "工作图 16",
        "width": 1600,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-16.webp"
      },
      {
        "key": "energy-selection-visual-17",
        "src": "/images/projects/energy-selection/visual-17.webp",
        "label": "工作图 17",
        "width": 3840,
        "height": 2400,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-17.webp"
      },
      {
        "key": "energy-selection-visual-18",
        "src": "/images/projects/energy-selection/visual-18.webp",
        "label": "工作图 18",
        "width": 3840,
        "height": 2400,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-18.webp"
      },
      {
        "key": "energy-selection-visual-19",
        "src": "/images/projects/energy-selection/visual-19.webp",
        "label": "工作图 19",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-19.webp"
      },
      {
        "key": "energy-selection-visual-20",
        "src": "/images/projects/energy-selection/visual-20.webp",
        "label": "工作图 20",
        "width": 2500,
        "height": 2500,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-20.webp"
      },
      {
        "key": "energy-selection-visual-21",
        "src": "/images/projects/energy-selection/visual-21.webp",
        "label": "工作图 21",
        "width": 1600,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-21.webp"
      },
      {
        "key": "energy-selection-visual-22",
        "src": "/images/projects/energy-selection/visual-22.webp",
        "label": "工作图 22",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-22.webp"
      },
      {
        "key": "energy-selection-visual-23",
        "src": "/images/projects/energy-selection/visual-23.webp",
        "label": "工作图 23",
        "width": 2000,
        "height": 2000,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-23.webp"
      },
      {
        "key": "energy-selection-visual-24",
        "src": "/images/projects/energy-selection/visual-24.webp",
        "label": "工作图 24",
        "width": 2000,
        "height": 2000,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-24.webp"
      },
      {
        "key": "energy-selection-visual-25",
        "src": "/images/projects/energy-selection/visual-25.webp",
        "label": "工作图 25",
        "width": 3840,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-25.webp"
      },
      {
        "key": "energy-selection-visual-26",
        "src": "/images/projects/energy-selection/visual-26.webp",
        "label": "工作图 26",
        "width": 3840,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-26.webp"
      },
      {
        "key": "energy-selection-visual-27",
        "src": "/images/projects/energy-selection/visual-27.webp",
        "label": "工作图 27",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-27.webp"
      },
      {
        "key": "energy-selection-visual-28",
        "src": "/images/projects/energy-selection/visual-28.webp",
        "label": "工作图 28",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-28.webp"
      },
      {
        "key": "energy-selection-visual-29",
        "src": "/images/projects/energy-selection/visual-29.webp",
        "label": "工作图 29",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-29.webp"
      },
      {
        "key": "energy-selection-visual-30",
        "src": "/images/projects/energy-selection/visual-30.webp",
        "label": "工作图 30",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-30.webp"
      },
      {
        "key": "energy-selection-visual-31",
        "src": "/images/projects/energy-selection/visual-31.webp",
        "label": "工作图 31",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-31.webp"
      },
      {
        "key": "energy-selection-visual-32",
        "src": "/images/projects/energy-selection/visual-32.webp",
        "label": "工作图 32",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-32.webp"
      },
      {
        "key": "energy-selection-visual-33",
        "src": "/images/projects/energy-selection/visual-33.webp",
        "label": "工作图 33",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-33.webp"
      },
      {
        "key": "energy-selection-visual-34",
        "src": "/images/projects/energy-selection/visual-34.webp",
        "label": "工作图 34",
        "width": 3840,
        "height": 1400,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-34.webp"
      },
      {
        "key": "energy-selection-visual-35",
        "src": "/images/projects/energy-selection/visual-35.webp",
        "label": "工作图 35",
        "width": 2560,
        "height": 650,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-35.webp"
      },
      {
        "key": "energy-selection-visual-36",
        "src": "/images/projects/energy-selection/visual-36.webp",
        "label": "工作图 36",
        "width": 2560,
        "height": 650,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-36.webp"
      },
      {
        "key": "energy-selection-visual-37",
        "src": "/images/projects/energy-selection/visual-37.webp",
        "label": "工作图 37",
        "width": 2560,
        "height": 650,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-37.webp"
      },
      {
        "key": "energy-selection-visual-38",
        "src": "/images/projects/energy-selection/visual-38.webp",
        "label": "工作图 38",
        "width": 2560,
        "height": 650,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-38.webp"
      },
      {
        "key": "energy-selection-visual-39",
        "src": "/images/projects/energy-selection/visual-39.webp",
        "label": "工作图 39",
        "width": 3840,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-39.webp"
      },
      {
        "key": "energy-selection-visual-40",
        "src": "/images/projects/energy-selection/visual-40.webp",
        "label": "工作图 40",
        "width": 3840,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-40.webp"
      },
      {
        "key": "energy-selection-visual-41",
        "src": "/images/projects/energy-selection/visual-41.webp",
        "label": "工作图 41",
        "width": 3840,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-41.webp"
      },
      {
        "key": "energy-selection-visual-42",
        "src": "/images/projects/energy-selection/visual-42.webp",
        "label": "工作图 42",
        "width": 3840,
        "height": 1695,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-42.webp"
      },
      {
        "key": "energy-selection-visual-43",
        "src": "/images/projects/energy-selection/visual-43.webp",
        "label": "工作图 43",
        "width": 1920,
        "height": 640,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-43.webp"
      },
      {
        "key": "energy-selection-visual-44",
        "src": "/images/projects/energy-selection/visual-44.webp",
        "label": "工作图 44",
        "width": 3840,
        "height": 1695,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-44.webp"
      },
      {
        "key": "energy-selection-visual-45",
        "src": "/images/projects/energy-selection/visual-45.webp",
        "label": "工作图 45",
        "width": 1920,
        "height": 640,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-45.webp"
      },
      {
        "key": "energy-selection-visual-46",
        "src": "/images/projects/energy-selection/visual-46.webp",
        "label": "工作图 46",
        "width": 1920,
        "height": 650,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-46.webp"
      },
      {
        "key": "energy-selection-visual-47",
        "src": "/images/projects/energy-selection/visual-47.webp",
        "label": "工作图 47",
        "width": 1920,
        "height": 650,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-47.webp"
      },
      {
        "key": "energy-selection-visual-48",
        "src": "/images/projects/energy-selection/visual-48.webp",
        "label": "工作图 48",
        "width": 3840,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-48.webp"
      },
      {
        "key": "energy-selection-visual-49",
        "src": "/images/projects/energy-selection/visual-49.webp",
        "label": "工作图 49",
        "width": 3840,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-49.webp"
      },
      {
        "key": "energy-selection-visual-50",
        "src": "/images/projects/energy-selection/visual-50.webp",
        "label": "工作图 50",
        "width": 1280,
        "height": 720,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-50.webp"
      },
      {
        "key": "energy-selection-visual-51",
        "src": "/images/projects/energy-selection/visual-51.webp",
        "label": "工作图 51",
        "width": 1280,
        "height": 720,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-51.webp"
      },
      {
        "key": "energy-selection-visual-52",
        "src": "/images/projects/energy-selection/visual-52.webp",
        "label": "工作图 52",
        "width": 3840,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-52.webp"
      },
      {
        "key": "energy-selection-visual-53",
        "src": "/images/projects/energy-selection/visual-53.webp",
        "label": "工作图 53",
        "width": 3840,
        "height": 2400,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-53.webp"
      },
      {
        "key": "energy-selection-visual-54",
        "src": "/images/projects/energy-selection/visual-54.webp",
        "label": "工作图 54",
        "width": 3000,
        "height": 1500,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-54.webp"
      },
      {
        "key": "energy-selection-visual-55",
        "src": "/images/projects/energy-selection/visual-55.webp",
        "label": "工作图 55",
        "width": 3000,
        "height": 1500,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-55.webp"
      },
      {
        "key": "energy-selection-visual-56",
        "src": "/images/projects/energy-selection/visual-56.webp",
        "label": "工作图 56",
        "width": 3000,
        "height": 1500,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-56.webp"
      },
      {
        "key": "energy-selection-visual-57",
        "src": "/images/projects/energy-selection/visual-57.webp",
        "label": "工作图 57",
        "width": 3000,
        "height": 1500,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-57.webp"
      },
      {
        "key": "energy-selection-visual-58",
        "src": "/images/projects/energy-selection/visual-58.webp",
        "label": "工作图 58",
        "width": 3000,
        "height": 1500,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-58.webp"
      },
      {
        "key": "energy-selection-visual-59",
        "src": "/images/projects/energy-selection/visual-59.webp",
        "label": "工作图 59",
        "width": 3000,
        "height": 1500,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-59.webp"
      },
      {
        "key": "energy-selection-visual-60",
        "src": "/images/projects/energy-selection/visual-60.webp",
        "label": "工作图 60",
        "width": 3840,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-60.webp"
      },
      {
        "key": "energy-selection-visual-61",
        "src": "/images/projects/energy-selection/visual-61.webp",
        "label": "工作图 61",
        "width": 1464,
        "height": 600,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-61.webp"
      },
      {
        "key": "energy-selection-visual-62",
        "src": "/images/projects/energy-selection/visual-62.webp",
        "label": "工作图 62",
        "width": 2000,
        "height": 1500,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-62.webp"
      },
      {
        "key": "energy-selection-visual-63",
        "src": "/images/projects/energy-selection/visual-63.webp",
        "label": "工作图 63",
        "width": 2000,
        "height": 1500,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-63.webp"
      },
      {
        "key": "energy-selection-visual-64",
        "src": "/images/projects/energy-selection/visual-64.webp",
        "label": "工作图 64",
        "width": 1200,
        "height": 1200,
        "type": "collection",
        "preview": "/images/projects/energy-selection/previews/visual-64.webp"
      }
    ],
    "aplus": [],
    "products": [],
    "mergeFirstTwo": false,
    "platform": "电商 / 品牌视觉",
    "kind": "collection",
    "displayIndex": "06",
    "category": "工作图节选",
    "thumbnail": "/images/projects/energy-selection/thumbnail.webp"
  },
  {
    "id": "10",
    "slug": "3c-selection",
    "accent": "3C",
    "name": "工作图节选",
    "displayName": "3C工作图节选",
    "title": "3C工作图节选",
    "detailPath": "/projects/3c-selection",
    "cover": "/images/projects/3c-selection/visual-06.webp",
    "listingRatio": "ORIGINAL FORMAT",
    "listing": [
      {
        "key": "3c-selection-visual-01",
        "src": "/images/projects/3c-selection/visual-01.webp",
        "label": "工作图 01",
        "width": 1280,
        "height": 539,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-01.webp"
      },
      {
        "key": "3c-selection-visual-02",
        "src": "/images/projects/3c-selection/visual-02.webp",
        "label": "工作图 02",
        "width": 1280,
        "height": 400,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-02.webp"
      },
      {
        "key": "3c-selection-visual-03",
        "src": "/images/projects/3c-selection/visual-03.webp",
        "label": "工作图 03",
        "width": 1280,
        "height": 400,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-03.webp"
      },
      {
        "key": "3c-selection-visual-04",
        "src": "/images/projects/3c-selection/visual-04.webp",
        "label": "工作图 04",
        "width": 1280,
        "height": 614,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-04.webp"
      },
      {
        "key": "3c-selection-visual-05",
        "src": "/images/projects/3c-selection/visual-05.webp",
        "label": "工作图 05",
        "width": 1280,
        "height": 614,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-05.webp"
      },
      {
        "key": "3c-selection-visual-06",
        "src": "/images/projects/3c-selection/visual-06.webp",
        "label": "工作图 06",
        "width": 1280,
        "height": 614,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-06.webp"
      },
      {
        "key": "3c-selection-visual-07",
        "src": "/images/projects/3c-selection/visual-07.webp",
        "label": "工作图 07",
        "width": 1280,
        "height": 768,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-07.webp"
      },
      {
        "key": "3c-selection-visual-08",
        "src": "/images/projects/3c-selection/visual-08.webp",
        "label": "工作图 08",
        "width": 1280,
        "height": 1280,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-08.webp"
      },
      {
        "key": "3c-selection-visual-09",
        "src": "/images/projects/3c-selection/visual-09.webp",
        "label": "工作图 09",
        "width": 1280,
        "height": 1280,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-09.webp"
      },
      {
        "key": "3c-selection-visual-10",
        "src": "/images/projects/3c-selection/visual-10.webp",
        "label": "工作图 10",
        "width": 1280,
        "height": 1985,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-10.webp"
      },
      {
        "key": "3c-selection-visual-11",
        "src": "/images/projects/3c-selection/visual-11.webp",
        "label": "工作图 11",
        "width": 1280,
        "height": 1951,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-11.webp"
      },
      {
        "key": "3c-selection-visual-12",
        "src": "/images/projects/3c-selection/visual-12.webp",
        "label": "工作图 12",
        "width": 1280,
        "height": 1707,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-12.webp"
      },
      {
        "key": "3c-selection-visual-13",
        "src": "/images/projects/3c-selection/visual-13.webp",
        "label": "工作图 13",
        "width": 1280,
        "height": 1707,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-13.webp"
      },
      {
        "key": "3c-selection-visual-14",
        "src": "/images/projects/3c-selection/visual-14.webp",
        "label": "工作图 14",
        "width": 1280,
        "height": 2133,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-14.webp"
      },
      {
        "key": "3c-selection-visual-15",
        "src": "/images/projects/3c-selection/visual-15.webp",
        "label": "工作图 15",
        "width": 1280,
        "height": 1707,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-15.webp"
      },
      {
        "key": "3c-selection-visual-16",
        "src": "/images/projects/3c-selection/visual-16.webp",
        "label": "工作图 16",
        "width": 1280,
        "height": 2133,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-16.webp"
      },
      {
        "key": "3c-selection-visual-17",
        "src": "/images/projects/3c-selection/visual-17.webp",
        "label": "工作图 17",
        "width": 1280,
        "height": 2067,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-17.webp"
      },
      {
        "key": "3c-selection-visual-18",
        "src": "/images/projects/3c-selection/visual-18.webp",
        "label": "工作图 18",
        "width": 1280,
        "height": 1707,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-18.webp"
      },
      {
        "key": "3c-selection-visual-19",
        "src": "/images/projects/3c-selection/visual-19.webp",
        "label": "工作图 19",
        "width": 1280,
        "height": 1707,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-19.webp"
      },
      {
        "key": "3c-selection-visual-20",
        "src": "/images/projects/3c-selection/visual-20.webp",
        "label": "工作图 20",
        "width": 1280,
        "height": 1918,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-20.webp"
      },
      {
        "key": "3c-selection-visual-21",
        "src": "/images/projects/3c-selection/visual-21.webp",
        "label": "工作图 21",
        "width": 1280,
        "height": 1918,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-21.webp"
      },
      {
        "key": "3c-selection-visual-22",
        "src": "/images/projects/3c-selection/visual-22.webp",
        "label": "工作图 22",
        "width": 1280,
        "height": 1918,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-22.webp"
      },
      {
        "key": "3c-selection-visual-23",
        "src": "/images/projects/3c-selection/visual-23.webp",
        "label": "工作图 23",
        "width": 1280,
        "height": 1918,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-23.webp"
      },
      {
        "key": "3c-selection-visual-24",
        "src": "/images/projects/3c-selection/visual-24.webp",
        "label": "工作图 24",
        "width": 1280,
        "height": 1918,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-24.webp"
      },
      {
        "key": "3c-selection-visual-25",
        "src": "/images/projects/3c-selection/visual-25.webp",
        "label": "工作图 25",
        "width": 1280,
        "height": 1918,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-25.webp"
      },
      {
        "key": "3c-selection-visual-26",
        "src": "/images/projects/3c-selection/visual-26.webp",
        "label": "工作图 26",
        "width": 1280,
        "height": 1918,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-26.webp"
      },
      {
        "key": "3c-selection-visual-27",
        "src": "/images/projects/3c-selection/visual-27.webp",
        "label": "工作图 27",
        "width": 1600,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-27.webp"
      },
      {
        "key": "3c-selection-visual-28",
        "src": "/images/projects/3c-selection/visual-28.webp",
        "label": "工作图 28",
        "width": 1464,
        "height": 614,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-28.webp"
      },
      {
        "key": "3c-selection-visual-29",
        "src": "/images/projects/3c-selection/visual-29.webp",
        "label": "工作图 29",
        "width": 1500,
        "height": 2080,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-29.webp"
      },
      {
        "key": "3c-selection-visual-30",
        "src": "/images/projects/3c-selection/visual-30.webp",
        "label": "工作图 30",
        "width": 1800,
        "height": 2472,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-30.webp"
      },
      {
        "key": "3c-selection-visual-31",
        "src": "/images/projects/3c-selection/visual-31.webp",
        "label": "工作图 31",
        "width": 1600,
        "height": 1600,
        "type": "collection",
        "preview": "/images/projects/3c-selection/previews/visual-31.webp"
      }
    ],
    "aplus": [],
    "products": [],
    "mergeFirstTwo": false,
    "platform": "电商 / 品牌视觉",
    "kind": "collection",
    "displayIndex": "07",
    "category": "工作图节选",
    "thumbnail": "/images/projects/3c-selection/thumbnail.webp"
  }
];

export const listingProjects=mapPublicAssets(rawData);
