import {mapPublicAssets} from './published-state';
// 正式素材可放入 public/images，在这里更新路径；本地预览上传不修改源文件。
const rawData = {
  video: '/images/night-designer.mp4',
  poster: '/images/night-designer.jpg',
  slides: [
    { project: '03', image: '/images/carousel/ai.svg', position: '55% center' },
    { project: '04', image: '/images/carousel/brand.svg', position: '75% center' },
    { project: '01', image: '/images/projects/24v-charger/listing-01.webp', position: '75% center' },
    { project: '02', image: '/images/carousel/audio.svg', position: '55% center' },
    { project: '04', image: '/images/carousel/brand.svg', position: '15% center' },
    { project: '03', image: '/images/carousel/ai.svg', position: 'center' },
    { project: '02', image: '/images/carousel/audio.svg', position: '65% center' },
    { project: '01', image: '/images/projects/24v-charger/listing-01.webp', position: '70% center' },
  ],
};

export const heroMedia=mapPublicAssets(rawData);
