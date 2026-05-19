/*
 * BUMI LAB — Product Data
 * All AUIN ACU-SHOT product data based on official HTML detail files
 */

export interface ProductSpec {
  labelKo: string;
  labelEn: string;
  value: string;
}

export interface ProductStep {
  stepKo: string;
  stepEn: string;
  descKo: string;
  descEn: string;
}

export interface ProductPoint {
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
}

export interface ProductData {
  htmlUrl: string; // Uploaded original HTML detail page URL
  id: string;
  slug: string;
  nameKo: string;
  nameEn: string;
  subtitleKo: string;
  subtitleEn: string;
  tagKo: string;
  tagEn: string;
  badge?: string;
  isSet?: boolean;
  spiculeSize: string;
  img: string;
  imgAlt: string;

  // Hero section
  heroTaglineKo: string;
  heroTaglineEn: string;
  heroDescKo: string;
  heroDescEn: string;
  heroPillsKo: string[];
  heroPillsEn: string[];

  // Key metrics
  metrics: { labelKo: string; labelEn: string; value: string; unitKo: string; unitEn: string; noteKo: string; noteEn: string }[];

  // Highlight points
  points: ProductPoint[];

  // How to use
  steps: ProductStep[];

  // Product specs table
  specs: ProductSpec[];

  // For whom
  forWhomKo: string[];
  forWhomEn: string[];

  // Closing message
  closingKo: string;
  closingEn: string;

  // Price (KRW)
  price: number;
}

const IMGS = {
  // spot-cream: 주사기형 단품 (ACU-SHOT Spot Care Cream 라벨)
  spot: '/manus-storage/auin-spot-cream_021afe87.png',
  // mild-daily: 펌프형 크림 단품 (Mild Daily Cream)
  mild: '/manus-storage/auin-mild-cream_686dd894.png',
  // ha-ampoule: 바이알+캡 세트 (녹색/흰색 알약 포함 — HA 앰플 형태)
  ha: '/manus-storage/auin-vial-set_a8979d98.jpg',
  // vita-c: 드로퍼+바이알 세트 (비타민C 파우더 앰플 형태)
  vitac: '/manus-storage/auin-ha-set_97515706.png',
  // all-in-one: 주사기×6 세트
  allinone: '/manus-storage/auin-syringe-set_ffd7983c.png',
  // brightening-set: 주사기+앰플 혼합 세트
  brightening: '/manus-storage/auin-brightening-set_eee5e8f3.png',
};

export const PRODUCTS: ProductData[] = [
  {
    id: 'spot-cream',
    slug: 'spot-cream',
    htmlUrl: '/manus-storage/product-spot_1bb81a5c.html',
    nameKo: 'ACU-SHOT 스팟 케어 크림',
    nameEn: 'ACU-SHOT Spot Care Cream',
    subtitleKo: '고민 부위만 콕 케어',
    subtitleEn: 'Targeted Spot Treatment',
    tagKo: '국소 집중 케어',
    tagEn: 'Spot Intensive',
    badge: 'BEST',
    spiculeSize: '270μm',
    img: IMGS.spot,
    imgAlt: 'AUIN ACU-SHOT Spot Care Cream',
    heroTaglineKo: '먼저 눈에 띄는 고민 부위만 콕 케어',
    heroTaglineEn: 'Targeted Care for Visible Concerns',
    heroDescKo: '넓게 바르지 않아도, 신경 쓰이는 부위에만 정교하게 사용할 수 있는 스팟 전용 크림. 270μm 스피큘과 고농도 4% 포뮬러, 3일 1회 루틴으로 필요한 부위만 집중 케어합니다.',
    heroDescEn: 'A spot-dedicated cream for precise application on targeted areas without spreading over the entire face. 270μm spicules and a high-concentration 4% formula in a 3-day interval routine.',
    heroPillsKo: ['고민 부위 집중 케어', '3일 1회 루틴', '270μm 스피큘', '저녁 세안 후 사용'],
    heroPillsEn: ['Targeted spot care', '3-day routine', '270μm Spicule', 'Use after evening cleansing'],
    metrics: [
      { labelKo: '스피큘 길이', labelEn: 'Spicule Length', value: '270', unitKo: 'μm', unitEn: 'μm', noteKo: '국소 부위에 맞춘 스피큘 길이', noteEn: 'Optimized spicule length for spot care' },
      { labelKo: '스피큘 함유량', labelEn: 'Spicule Content', value: '4', unitKo: '%', unitEn: '%', noteKo: '스팟 케어용 고농도 포뮬러', noteEn: 'High-concentration formula for spot care' },
      { labelKo: '케어 주기', labelEn: 'Care Cycle', value: '3', unitKo: '일', unitEn: 'Days', noteKo: '부담을 줄인 3일 간격 루틴', noteEn: 'Low-burden 3-day interval routine' },
      { labelKo: '흡수 효율', labelEn: 'Absorption', value: '31', unitKo: '배', unitEn: 'x', noteKo: '일반 도포 대비 높은 흡수 효율', noteEn: 'Higher absorption vs. regular application' },
    ],
    points: [
      { titleKo: '국소 집중 케어', titleEn: 'Targeted Spot Care', descKo: '얼굴 전체보다 먼저 신경 쓰이는 부위에 점처럼 작은 부위도 필요한 만큼만 집중 케어할 수 있습니다.', descEn: 'Focus care precisely on the areas that concern you most, even the smallest spots, without applying all over.' },
      { titleKo: '저녁 루틴에 더하는 집중 케어', titleEn: 'Evening Routine Intensive', descKo: '필요한 날, 필요한 부위에만 더해 깔끔한 인상을 관리해 보세요. 3일 간격으로 부담 없이 이어가는 루틴입니다.', descEn: 'Add to your routine only when and where needed. A low-burden routine that continues every 3 days.' },
      { titleKo: '270μm 스피큘의 정교한 전달', titleEn: 'Precise 270μm Spicule Delivery', descKo: '미세 스피큘 구조가 유효 성분 전달을 도와 필요한 부위를 더 정교하게 케어합니다. 스팟 케어에 최적화된 포뮬러입니다.', descEn: 'The micro-spicule structure aids active ingredient delivery for more precise care in targeted areas.' },
      { titleKo: '스피큘 개수 1,467,400개', titleEn: '1,467,400 Spicules', descKo: '10g 용량 안에 1,467,400개의 스피큘이 담겨 있어 집중적인 케어 밀도를 제공합니다.', descEn: '1,467,400 spicules in a 10g container for intensive care density.' },
    ],
    steps: [
      { stepKo: 'STEP 01', stepEn: 'STEP 01', descKo: '저녁 세안 후 피부를 충분히 건조시켜 주세요.', descEn: 'After evening cleansing, dry your skin thoroughly.' },
      { stepKo: 'STEP 02', stepEn: 'STEP 02', descKo: '신경 쓰이는 부위에 소량만 콕 도포해 주세요. 넓게 펴 바르지 않아도 됩니다.', descEn: 'Apply a small amount precisely to targeted areas. No need to spread widely.' },
      { stepKo: 'STEP 03', stepEn: 'STEP 03', descKo: '손끝으로 부드럽게 눌러 흡수시켜 주세요. 강하게 문지르지 않도록 주의하세요.', descEn: 'Gently press with fingertips to absorb. Avoid rubbing vigorously.' },
      { stepKo: 'STEP 04', stepEn: 'STEP 04', descKo: '3일 간격으로 반복 사용하세요. 피부 컨디션에 따라 주기를 조절할 수 있습니다.', descEn: 'Repeat every 3 days. Adjust the cycle according to your skin condition.' },
    ],
    specs: [
      { labelKo: '제품 타입', labelEn: 'Product Type', value: 'Spot Cream' },
      { labelKo: '용량', labelEn: 'Volume', value: 'Syringe 10g × 1pc' },
      { labelKo: '스피큘 길이', labelEn: 'Spicule Length', value: '270μm' },
      { labelKo: '스피큘 함유량', labelEn: 'Spicule Content', value: '고농도 4%' },
      { labelKo: '스피큘 개수', labelEn: 'Spicule Count', value: '1,467,400개' },
      { labelKo: '케어 주기', labelEn: 'Care Cycle', value: '3일 1회' },
      { labelKo: '적용 부위', labelEn: 'Application Area', value: '신경 쓰이는 국소 부위' },
      { labelKo: '사용 타이밍', labelEn: 'Usage Timing', value: '저녁 세안 후' },
    ],
    forWhomKo: ['얼굴 전체보다 특정 부위가 먼저 신경 쓰이는 분', '작은 부위도 정교하게 관리하고 싶은 분', '매일 사용하지 않아도 되는 부담 없는 루틴을 원하는 분'],
    forWhomEn: ['Those bothered by specific areas more than the overall face', 'Those who want precise care for small targeted areas', 'Those seeking a low-burden routine without daily use'],
    closingKo: '필요한 부위에만, 필요한 만큼만. 스팟 케어의 정석을 경험해 보세요.',
    closingEn: 'Only where needed, only as much as needed. Experience the essence of spot care.',
    price: 38000,
  },
  {
    id: 'mild-daily',
    slug: 'mild-daily',
    htmlUrl: '/manus-storage/product-mild_93e16c88.html',
    nameKo: 'ACU-SHOT 마일드 데일리 크림',
    nameEn: 'ACU-SHOT Mild Daily Cream',
    subtitleKo: '매일 바르는 순간까지 우아하게',
    subtitleEn: 'Elegantly Refined Every Day',
    tagKo: '데일리 케어',
    tagEn: 'Daily Care',
    spiculeSize: '100μm',
    img: IMGS.mild,
    imgAlt: 'AUIN ACU-SHOT Mild Daily Cream',
    heroTaglineKo: '매일 바르는 순간까지 우아하게 정돈되는 마일드 데일리 크림',
    heroTaglineEn: 'Mild Daily Cream — Elegantly Refined Every Day',
    heroDescKo: '예민한 날에도 손이 가는 편안함, 바른 직후보다 시간이 지날수록 더 마음에 드는 결 정돈감, 그리고 과하지 않게 맑아 보이는 피부 인상까지. 매일의 루틴을 한 단계 고급스럽게 완성하는 데일리 크림입니다.',
    heroDescEn: 'Comfortable enough to reach for even on sensitive days. Skin texture that improves over time. A naturally radiant appearance without excess. A daily cream that elevates your everyday routine.',
    heroPillsKo: ['100μm 울트라파인 스피큘', '데일리 루틴', '50ml 펌프 타입', '아침·저녁 모두 사용'],
    heroPillsEn: ['100μm Ultra-fine Spicule', 'Daily Routine', '50ml Pump Type', 'Morning & Evening Use'],
    metrics: [
      { labelKo: '스피큘 크기', labelEn: 'Spicule Size', value: '100', unitKo: 'μm', unitEn: 'μm', noteKo: '울트라파인 데일리 스피큘', noteEn: 'Ultra-fine daily spicule' },
      { labelKo: '스피큘 개수', labelEn: 'Spicule Count', value: '247', unitKo: '만개+', unitEn: '万+', noteKo: '2,476,500개 기준 설계', noteEn: '2,476,500 spicules by design' },
      { labelKo: '용량', labelEn: 'Volume', value: '50', unitKo: 'ml', unitEn: 'ml', noteKo: '펌프 타입 편의성', noteEn: 'Pump-type convenience' },
      { labelKo: '사용 주기', labelEn: 'Usage Cycle', value: '매일', unitKo: '', unitEn: 'Daily', noteKo: '아침·저녁 데일리 루틴', noteEn: 'Morning & evening routine' },
    ],
    points: [
      { titleKo: '부담은 덜고, 루틴 만족감은 높게', titleEn: 'Less Burden, More Satisfaction', descKo: '스피큘 루틴이 낯선 분도 시작하기 쉬운 데일리 밸런스로 접근 장벽을 낮췄습니다. 처음부터 과하게 밀어붙이지 않아 매일의 습관으로 연결하기 좋습니다.', descEn: 'A daily balance that lowers the barrier to entry for those new to spicule routines. Designed to build into a daily habit without overwhelming from the start.' },
      { titleKo: '끈적임보다 먼저 오는 매끈한 정돈감', titleEn: 'Smooth Refinement Over Stickiness', descKo: '두껍고 답답하게 남기보다 얇고 부드럽게 펴지며, 피부 표면을 말끔하게 정리한 듯한 인상을 남기는 크림 무드를 지향합니다.', descEn: 'Spreads thinly and smoothly rather than feeling thick and heavy, leaving a clean, refined impression on the skin surface.' },
      { titleKo: '멀리서보다 가까이서 더 예뻐 보이는 피부', titleEn: 'Skin That Looks Better Up Close', descKo: '번들거림으로 존재감을 만드는 제품이 아니라, 피부를 가까이서 봤을 때 더 정돈되어 보이는 인상을 남기는 제품입니다.', descEn: 'Not a product that creates presence through shine, but one that leaves a more refined impression when skin is viewed up close.' },
      { titleKo: '어디에 두어도 예쁜 프리미엄 패키지', titleEn: 'Premium Package Beautiful Anywhere', descKo: '화이트 바디와 실버 포인트의 미니멀 패키지로 사용하는 순간뿐 아니라 보이는 순간까지 만족스럽게 완성했습니다.', descEn: 'A minimalist package with white body and silver accents, satisfying not just when used but also when displayed.' },
    ],
    steps: [
      { stepKo: 'STEP 01', stepEn: 'STEP 01', descKo: '세안 후 토너와 가벼운 세럼으로 피부를 촉촉하게 정리해 주세요.', descEn: 'After cleansing, prep skin with toner and a light serum.' },
      { stepKo: 'STEP 02', stepEn: 'STEP 02', descKo: '펌프 타입으로 적당량을 덜어 얼굴 전체에 얇고 고르게 펴 발라 주세요.', descEn: 'Dispense an appropriate amount with the pump and spread thinly and evenly over the entire face.' },
      { stepKo: 'STEP 03', stepEn: 'STEP 03', descKo: '강하게 문지르기보다 손바닥으로 감싸듯 마무리하면 더 편안한 루틴이 완성됩니다.', descEn: 'Rather than rubbing vigorously, finish by gently cupping your palms over your face for a more comfortable routine.' },
    ],
    specs: [
      { labelKo: '제품 타입', labelEn: 'Product Type', value: 'Daily Cream' },
      { labelKo: '용량', labelEn: 'Volume', value: '50ml Pump' },
      { labelKo: '스피큘 크기', labelEn: 'Spicule Size', value: '100μm Ultra-fine' },
      { labelKo: '스피큘 개수', labelEn: 'Spicule Count', value: '2,476,500개' },
      { labelKo: '사용 주기', labelEn: 'Usage Cycle', value: '매일 (아침·저녁)' },
      { labelKo: '제형', labelEn: 'Texture', value: '부드럽게 펴지는 크림' },
      { labelKo: '사용 타이밍', labelEn: 'Usage Timing', value: '스킨케어 마지막 단계' },
      { labelKo: '용도', labelEn: 'Usage', value: '개인 가정용' },
    ],
    forWhomKo: ['스피큘 루틴을 처음 시작하는 분', '예민한 날에도 부담 없이 쓸 수 있는 데일리 크림을 원하는 분', '무거운 광보다 피부결이 정리되어 보이는 느낌을 선호하는 분'],
    forWhomEn: ['Those starting a spicule routine for the first time', 'Those seeking a daily cream gentle enough for sensitive days', 'Those who prefer refined skin texture over heavy shine'],
    closingKo: '강한 인상을 남기지 않아도 계속 찾게 되는 크림. 매일의 만족감이 쌓이는 루틴형 데일리 케어입니다.',
    closingEn: 'A cream you keep reaching for without making a strong statement. A routine-based daily care that accumulates daily satisfaction.',
    price: 45000,
  },
  {
    id: 'ha-ampoule',
    slug: 'ha-ampoule',
    htmlUrl: '/manus-storage/product-ha_d517d0e6.html',
    nameKo: 'ACU-SHOT HA 앰플',
    nameEn: 'ACU-SHOT HA Ampoule',
    subtitleKo: '72시간 차오르는 수분 리듬',
    subtitleEn: '72-Hour Moisture Rhythm',
    tagKo: '집중 보습',
    tagEn: 'Deep Hydration',
    badge: 'NEW',
    spiculeSize: '270μm',
    img: IMGS.ha,
    imgAlt: 'AUIN ACU-SHOT HA Ampoule',
    heroTaglineKo: '단 한 번으로도 72시간 차오르는 수분 리듬',
    heroTaglineEn: 'A Single Use That Fills 72 Hours of Moisture',
    heroDescKo: '동결건조 HA 볼이 피부 위에서 신선하게 녹아드는 순간, 스피큘이 길을 열어 깊고 조밀한 수분 레이어링을 돕습니다. 3일에 한 번 이어가는 프리미엄 집중 수분 루틴.',
    heroDescEn: 'As freeze-dried HA balls freshly dissolve on skin, spicules open pathways for deep, dense moisture layering. A premium intensive hydration ritual every 3 days.',
    heroPillsKo: ['동결건조 HA 볼 듀얼 시스템', '72시간 보습 지속', '3일 주기 루틴', '스피큘 270μm'],
    heroPillsEn: ['Freeze-dried HA Ball Dual System', '72-Hour Moisture', '3-Day Ritual', '270μm Spicule'],
    metrics: [
      { labelKo: '보습 지속', labelEn: 'Moisture Duration', value: '72', unitKo: '시간', unitEn: 'Hours', noteKo: '한 번 사용으로 72시간 보습 리듬', noteEn: '72-hour moisture rhythm per use' },
      { labelKo: '케어 주기', labelEn: 'Care Cycle', value: '3', unitKo: '일', unitEn: 'Days', noteKo: '3일 주기 딥 수분 루틴', noteEn: '3-day deep hydration ritual' },
      { labelKo: '스피큘 외경', labelEn: 'Spicule Outer', value: '15', unitKo: 'μm', unitEn: 'μm', noteKo: '속이 빈 원통형 터널 구조', noteEn: 'Hollow cylindrical tunnel structure' },
      { labelKo: '스피큘 내경', labelEn: 'Spicule Inner', value: '1.5', unitKo: 'μm', unitEn: 'μm', noteKo: 'HA 함침 터널 내경', noteEn: 'HA-impregnated tunnel inner diameter' },
    ],
    points: [
      { titleKo: '눈에 보이는 신뢰 — 동결건조 HA 볼', titleEn: 'Visible Trust — Freeze-dried HA Ball', descKo: '피부 위에서 녹아드는 동결건조 HA 볼을 직접 확인할 수 있어 사용 경험 자체에 프리미엄 설득력을 더합니다. 바르는 순간부터 차이를 체감할 수 있도록 설계된 포뮬러입니다.', descEn: 'You can directly observe the freeze-dried HA balls dissolving on skin, adding premium credibility to the experience itself.' },
      { titleKo: '깊이 들어가는 수분 — 스피큘 전달 시스템', titleEn: 'Deep Penetration — Spicule Delivery', descKo: '스피큘 270μm 바이오 마이크로니들이 유효성분의 이동 경로를 열어 저분자 HA가 더 깊숙이 전달되도록 설계되었습니다.', descEn: '270μm bio-microneedle spicules open pathways for active ingredients, allowing low-molecular HA to be delivered deeper.' },
      { titleKo: '오래 유지되는 수분 — 이중 HA 케어', titleEn: 'Long-lasting Moisture — Dual HA Care', descKo: '저분자 HA가 안쪽 수분 밀도를 채우고, 고분자 HA가 표면에 보습막을 형성해 즉각 충전과 장시간 유지의 밸런스를 만듭니다.', descEn: 'Low-molecular HA fills inner moisture density while high-molecular HA forms a moisture barrier on the surface, balancing instant filling and long-term retention.' },
      { titleKo: '다공성 스피큘의 숨겨진 비밀', titleEn: 'The Secret of Porous Spicules', descKo: '유니즈랩 스피큘은 외경 15μm, 내경 1.5μm의 속이 빈 원통형 터널 구조를 가집니다. 동결건조 HA 액체가 이 1.5μm 구멍 안으로 함침되어 스피큘과 함께 피부 깊숙이 이동합니다.', descEn: "Unislab spicules have a hollow cylindrical tunnel structure with 15μm outer and 1.5μm inner diameter. Freeze-dried HA liquid is impregnated into this 1.5μm tunnel and travels deep into skin with the spicule." },
    ],
    steps: [
      { stepKo: 'STEP 01', stepEn: 'STEP 01', descKo: '세안 후 토너로 피부를 정돈해 주세요.', descEn: 'After cleansing, prep skin with toner.' },
      { stepKo: 'STEP 02', stepEn: 'STEP 02', descKo: '바이알을 살짝 흔들어 동결건조 HA 볼이 고르게 분산되도록 해주세요.', descEn: 'Gently shake the vial to evenly distribute the freeze-dried HA balls.' },
      { stepKo: 'STEP 03', stepEn: 'STEP 03', descKo: '얼굴 전체에 고르게 도포하고 손끝으로 부드럽게 마사지해 주세요.', descEn: 'Apply evenly over the entire face and gently massage with fingertips.' },
      { stepKo: 'STEP 04', stepEn: 'STEP 04', descKo: '3일 주기로 반복 사용하세요. 사용 후 냉장 보관을 권장합니다.', descEn: 'Repeat every 3 days. Refrigerated storage is recommended after use.' },
    ],
    specs: [
      { labelKo: '제품 타입', labelEn: 'Product Type', value: 'HA Ampoule' },
      { labelKo: '시스템', labelEn: 'System', value: '동결건조 HA 볼 + 스피큘 듀얼' },
      { labelKo: '스피큘 길이', labelEn: 'Spicule Length', value: '270μm' },
      { labelKo: '스피큘 구조', labelEn: 'Spicule Structure', value: '다공성 중공 원통형' },
      { labelKo: '보습 지속', labelEn: 'Moisture Duration', value: '72시간' },
      { labelKo: '케어 주기', labelEn: 'Care Cycle', value: '3일 1회' },
      { labelKo: 'HA 구성', labelEn: 'HA Composition', value: '저분자 + 고분자 이중 HA' },
      { labelKo: '보관', labelEn: 'Storage', value: '사용 후 냉장 권장' },
    ],
    forWhomKo: ['속건조로 인한 푸석함이 고민인 분', '한 번의 사용으로 선명한 수분감을 원하는 분', '72시간 보습 지속력이 필요한 분'],
    forWhomEn: ['Those troubled by inner dryness and flakiness', 'Those wanting vivid hydration from a single use', 'Those needing 72-hour moisture retention'],
    closingKo: '단 한 번으로도 확실히 다른 수분의 밀도. 72시간 보습 리듬을 경험해 보세요.',
    closingEn: 'A noticeably different moisture density from just one use. Experience the 72-hour hydration rhythm.',
    price: 52000,
  },
  {
    id: 'vita-c',
    slug: 'vita-c',
    htmlUrl: '/manus-storage/product-vitac_29362cf1.html',
    nameKo: 'ACU-SHOT 비타민C 파우더 앰플',
    nameEn: 'ACU-SHOT Vita-C Powder Ampoule',
    subtitleKo: '한 병으로 끝내는 선명한 광채',
    subtitleEn: 'Brilliant Radiance in One Vial',
    tagKo: '브라이트닝',
    tagEn: 'Brightening',
    spiculeSize: '270μm',
    img: IMGS.vitac,
    imgAlt: 'AUIN ACU-SHOT Vita-C Powder Ampoule',
    heroTaglineKo: '한 병으로 끝내는 선명한 비타민 C 광채',
    heroTaglineEn: 'Brilliant Vitamin C Radiance in One Vial',
    heroDescKo: '비타민 C와 스피큘을 사용 직전까지 따로 보관해 더 신선하게. 캡을 누르는 순간 활성화되고, 바르는 순간부터 달라지는 사용감이 선명한 광채 루틴을 완성합니다.',
    heroDescEn: 'Vitamin C and spicules stored separately until the moment of use for maximum freshness. Activated when you press the cap, delivering a noticeably different experience from the first application.',
    heroPillsKo: ['사용 직전 활성화', '비타민 C & 스피큘 파우더', '듀얼 캡슐 시스템', '냉장 보관 권장'],
    heroPillsEn: ['Pre-use Activation', 'Vitamin C & Spicule Powder', 'Dual Capsule System', 'Refrigerated Storage'],
    metrics: [
      { labelKo: '시스템', labelEn: 'System', value: '듀얼', unitKo: '캡슐', unitEn: 'Capsule', noteKo: '비타민C + 스피큘 분리 보관', noteEn: 'Vitamin C + Spicule separated storage' },
      { labelKo: '활성화', labelEn: 'Activation', value: '즉시', unitKo: '', unitEn: 'Instant', noteKo: '캡 누르는 순간 활성화', noteEn: 'Activated the moment cap is pressed' },
      { labelKo: '효과', labelEn: 'Effect', value: '광채', unitKo: '+결', unitEn: '+Texture', noteKo: '맑은 광채 + 피부결 정돈', noteEn: 'Clear radiance + skin texture refinement' },
      { labelKo: '스피큘', labelEn: 'Spicule', value: '270', unitKo: 'μm', unitEn: 'μm', noteKo: '비타민C 전달 강화', noteEn: 'Enhanced Vitamin C delivery' },
    ],
    points: [
      { titleKo: '보이는 신선함 — 듀얼 캡슐 시스템', titleEn: 'Visible Freshness — Dual Capsule System', descKo: '민감한 비타민 C와 스피큘을 캡슐에 따로 담아 사용 직전까지 신선하게 유지했습니다. 필요한 순간 직접 활성화해 더 특별한 홈케어 루틴을 경험해 보세요.', descEn: 'Sensitive Vitamin C and spicules are stored separately in capsules to maintain freshness until use. Activate directly at the moment needed for a more special home care routine.' },
      { titleKo: '고급스러운 체감 — 직관적인 활성화', titleEn: 'Premium Feel — Intuitive Activation', descKo: '캡을 누르는 순간 캡슐 속 성분이 앰플에 떨어져 한 병 안에서 바로 활성화됩니다. 복잡한 과정 없이도 직관적이고 간편하게 사용할 수 있습니다.', descEn: 'The moment you press the cap, the capsule contents drop into the ampoule and activate instantly in one vial. Intuitive and simple without complex steps.' },
      { titleKo: '스피큘이 더하는 차별화된 사용감', titleEn: 'Differentiated Feel with Spicules', descKo: '비타민 C에 스피큘을 더해 바르는 순간부터 차별화된 밀착감을 느낄 수 있습니다. 매끈하게 정돈된 피부결과 선명한 광채 인상을 동시에 경험해 보세요.', descEn: 'With spicules added to Vitamin C, you can feel a differentiated adherence from the first application. Experience refined skin texture and vivid radiance simultaneously.' },
      { titleKo: '칙칙함 대신 선명한 광채', titleEn: 'Vivid Radiance Instead of Dullness', descKo: '거칠고 칙칙해 보이는 피부 인상을 보다 매끈하고 윤기 있게 정돈해 주는 광채 루틴. 복잡한 단계를 더하지 않아도 맑고 정돈된 인상을 남깁니다.', descEn: 'A radiance routine that refines rough, dull-looking skin to a smoother, more luminous appearance. Leaves a clear, refined impression without adding complex steps.' },
    ],
    steps: [
      { stepKo: 'STEP 01', stepEn: 'STEP 01', descKo: '세안 후 토너로 피부를 정돈해 주세요.', descEn: 'After cleansing, prep skin with toner.' },
      { stepKo: 'STEP 02', stepEn: 'STEP 02', descKo: '캡을 눌러 비타민 C 파우더와 스피큘을 앰플에 활성화시켜 주세요.', descEn: 'Press the cap to activate the Vitamin C powder and spicules into the ampoule.' },
      { stepKo: 'STEP 03', stepEn: 'STEP 03', descKo: '바이알을 살짝 흔들어 성분이 고르게 혼합되도록 해주세요.', descEn: 'Gently shake the vial to mix the ingredients evenly.' },
      { stepKo: 'STEP 04', stepEn: 'STEP 04', descKo: '얼굴 전체에 고르게 도포하고 부드럽게 흡수시켜 주세요. 사용 후 냉장 보관을 권장합니다.', descEn: 'Apply evenly over the entire face and absorb gently. Refrigerated storage is recommended after use.' },
    ],
    specs: [
      { labelKo: '제품 타입', labelEn: 'Product Type', value: 'Brightening Ampoule' },
      { labelKo: '시스템', labelEn: 'System', value: '듀얼 캡슐 (비타민C + 스피큘)' },
      { labelKo: '스피큘 길이', labelEn: 'Spicule Length', value: '270μm' },
      { labelKo: '활성화 방식', labelEn: 'Activation', value: '캡 누름 즉시 활성화' },
      { labelKo: '주요 효과', labelEn: 'Key Effect', value: '광채 + 피부결 정돈' },
      { labelKo: '보관', labelEn: 'Storage', value: '냉장 보관 권장' },
      { labelKo: '사용 타이밍', labelEn: 'Usage Timing', value: '세안 후 스킨케어 초기 단계' },
      { labelKo: '용도', labelEn: 'Usage', value: '개인 가정용' },
    ],
    forWhomKo: ['칙칙하고 거칠어 보이는 피부 인상이 고민인 분', '비타민 C 케어를 더 신선하고 특별하게 경험하고 싶은 분', '맑고 선명한 광채와 피부결 정돈을 동시에 원하는 분'],
    forWhomEn: ['Those troubled by dull and rough-looking skin', 'Those wanting a fresher, more special Vitamin C experience', 'Those seeking both clear radiance and refined skin texture'],
    closingKo: '칙칙함이 먼저 보였다면, 이제는 광채가 먼저 보이게. 비타민 C와 스피큘이 만나는 순간을 경험해 보세요.',
    closingEn: 'If dullness was what you saw first, now let radiance be first. Experience the moment Vitamin C meets spicule.',
    price: 58000,
  },
  {
    id: 'all-in-one',
    slug: 'all-in-one',
    htmlUrl: '/manus-storage/product-allinone_565b12df.html',
    nameKo: 'ACU-SHOT 올인원 프로 크림',
    nameEn: 'ACU-SHOT All-in-One Pro Cream',
    subtitleKo: '여러 피부 고민을 한 번에',
    subtitleEn: 'Multiple Concerns, One Solution',
    tagKo: '올인원 케어',
    tagEn: 'All-in-One',
    spiculeSize: '270μm',
    img: IMGS.allinone,
    imgAlt: 'AUIN ACU-SHOT All-in-One Pro Cream',
    heroTaglineKo: '여러 피부 고민을 한 번에 관리하는 올인원 홈케어 루틴',
    heroTaglineEn: 'All-in-One Home Care Routine for Multiple Skin Concerns',
    heroDescKo: '거친 결, 푸석한 인상, 칙칙한 톤까지. 집에서도 한 번 관리한 듯 정돈된 피부 인상을 느껴보세요. 얼굴 한 부위만 따로 보기보다 피부결·톤·윤기까지 전체 인상을 함께 관리하고 싶을 때 잘 맞는 올인원 루틴입니다.',
    heroDescEn: 'Rough texture, dull appearance, uneven tone — all at once. Feel the impression of skin that has been professionally cared for, at home. The perfect all-in-one routine for managing overall skin impression including texture, tone, and radiance.',
    heroPillsKo: ['4 IN 1 복합 케어', '주 1회 집중 루틴', '270μm 스피큘', '6회분 구성'],
    heroPillsEn: ['4 IN 1 Multi-care', 'Weekly Intensive Routine', '270μm Spicule', '6-Use Set'],
    metrics: [
      { labelKo: '케어 범위', labelEn: 'Care Range', value: '4', unitKo: 'IN 1', unitEn: 'IN 1', noteKo: '복합 피부 고민 케어', noteEn: 'Multi-concern skin care' },
      { labelKo: '구성', labelEn: 'Contents', value: '6', unitKo: '회분', unitEn: 'Uses', noteKo: '6회분 시린지 구성', noteEn: '6-use syringe set' },
      { labelKo: '케어 주기', labelEn: 'Care Cycle', value: '주', unitKo: '1회', unitEn: '1x/Week', noteKo: '주 1회 집중 홈케어', noteEn: 'Weekly intensive home care' },
      { labelKo: '스피큘', labelEn: 'Spicule', value: '270', unitKo: 'μm', unitEn: 'μm', noteKo: '미세 스피큘 집중 전달', noteEn: 'Micro-spicule intensive delivery' },
    ],
    points: [
      { titleKo: '얼굴 전체 인상 케어', titleEn: 'Full-Face Impression Care', descKo: '한 부위만 집중적으로 케어하기보다, 거울을 봤을 때 얼굴 전체가 더 맑고 매끈하고 정돈돼 보이길 원하는 분께 잘 맞는 올인원 케어입니다.', descEn: 'Rather than focusing on one area, this all-in-one care is perfect for those who want their entire face to look clearer, smoother, and more refined in the mirror.' },
      { titleKo: '관리받은 피부 같은 첫인상', titleEn: 'First Impression of Professionally Cared Skin', descKo: '한 부분만 도드라져 보이는 느낌보다, 얼굴 전체가 더 깔끔하고 정돈돼 보일 때 더 만족스러울 때가 있죠. 그런 피부 인상을 원할 때 잘 맞아요.', descEn: 'Sometimes it is more satisfying when the entire face looks cleaner and more refined rather than one area standing out. This is perfect for that impression.' },
      { titleKo: '시린지 타입의 집중 케어 무드', titleEn: 'Intensive Care Mood with Syringe Type', descKo: '시린지 타입이라 관리하는 느낌은 살면서도 부담스럽게 느껴지지 않아요. 집에서도 제대로 관리한 느낌을 남기고 싶은 날에 특히 만족스럽게 느껴져요.', descEn: 'The syringe type gives a sense of intensive care without feeling burdensome. Especially satisfying on days when you want to feel like you have properly cared for your skin at home.' },
      { titleKo: '다음날 화장 전 만족감', titleEn: 'Satisfaction Before Next-Day Makeup', descKo: '중요한 일정 전날, 집에서도 제대로 관리한 느낌을 남기고 싶은 날. 올인원 프로는 그런 날의 집중 케어로 잘 어울립니다.', descEn: 'The night before an important event, when you want to feel like you have properly cared for your skin at home. All-in-One Pro is perfect for intensive care on such days.' },
    ],
    steps: [
      { stepKo: 'STEP 01', stepEn: 'STEP 01', descKo: '저녁 세안 후 토너로 피부를 정돈해 주세요.', descEn: 'After evening cleansing, prep skin with toner.' },
      { stepKo: 'STEP 02', stepEn: 'STEP 02', descKo: '시린지에서 적당량을 덜어 얼굴 전체에 고르게 도포해 주세요.', descEn: 'Dispense an appropriate amount from the syringe and apply evenly over the entire face.' },
      { stepKo: 'STEP 03', stepEn: 'STEP 03', descKo: '손끝으로 약 2분간 부드럽게 마사지해 주세요.', descEn: 'Gently massage with fingertips for about 2 minutes.' },
      { stepKo: 'STEP 04', stepEn: 'STEP 04', descKo: '주 1회 루틴으로 사용하세요. 피부 컨디션에 따라 주기를 조절할 수 있습니다.', descEn: 'Use as a weekly routine. Adjust the cycle according to your skin condition.' },
    ],
    specs: [
      { labelKo: '제품 타입', labelEn: 'Product Type', value: 'All-in-One Pro Cream' },
      { labelKo: '제형', labelEn: 'Type', value: 'Syringe Cream' },
      { labelKo: '구성', labelEn: 'Contents', value: '6EA (6회분)' },
      { labelKo: '스피큘 길이', labelEn: 'Spicule Length', value: '270μm' },
      { labelKo: '케어 범위', labelEn: 'Care Range', value: '4 IN 1 복합 케어' },
      { labelKo: '케어 주기', labelEn: 'Care Cycle', value: '주 1회' },
      { labelKo: '사용 타이밍', labelEn: 'Usage Timing', value: '저녁 세안 후' },
      { labelKo: '용도', labelEn: 'Usage', value: '개인 가정용' },
    ],
    forWhomKo: ['피부결, 톤, 윤기 등 여러 고민을 한 번에 관리하고 싶은 분', '중요한 일정 전날 집중 케어가 필요한 분', '주 1회 집중 홈케어 루틴을 원하는 분'],
    forWhomEn: ['Those wanting to address multiple concerns (texture, tone, radiance) at once', 'Those needing intensive care the night before an important event', 'Those seeking a weekly intensive home care routine'],
    closingKo: '거친 결, 푸석한 인상, 칙칙한 톤까지. 올인원 프로 하나로 얼굴 전체 인상을 관리해 보세요.',
    closingEn: 'Rough texture, dull appearance, uneven tone. Manage your entire face impression with All-in-One Pro.',
    price: 68000,
  },
  {
    id: 'brightening-set',
    slug: 'brightening-set',
    htmlUrl: '/manus-storage/product-brightening_22632eb0.html',
    nameKo: 'ACU-SHOT 브라이트닝 3+3 세트',
    nameEn: 'ACU-SHOT Brightening 3+3 Set',
    subtitleKo: '집중 케어 + 진정 앰플 세트',
    subtitleEn: 'Intensive Care + Soothing Ampoule Set',
    tagKo: '세트 구성',
    tagEn: 'Set Collection',
    badge: 'SET',
    isSet: true,
    spiculeSize: '270μm',
    img: IMGS.brightening,
    imgAlt: 'AUIN ACU-SHOT Brightening 3+3 Set',
    heroTaglineKo: '스피큘의 결, 맑고 탄탄한 피부 인상을 한눈에',
    heroTaglineEn: 'Spicule Texture, Clear and Firm Skin Impression at a Glance',
    heroDescKo: '주사기형 집중 케어 3개 + 바이알형 양파 추출 진정 앰플 3개 구성. 도포 → 마사지 → 진정으로 이어지는 완성된 홈케어 루틴 세트. 집중 케어와 진정 마무리가 한 세트 안에서 역할이 분명하게 나뉩니다.',
    heroDescEn: 'Set of 3 syringe-type intensive care + 3 vial-type onion extract soothing ampoules. A complete home care routine: apply → massage → soothe. Intensive care and soothing finish have clearly defined roles within one set.',
    heroPillsKo: ['주사기형 집중 케어 3개', '진정 앰플 3개', '3일 간격 루틴', '도포→마사지→진정'],
    heroPillsEn: ['3 Syringe Intensive Care', '3 Soothing Ampoules', '3-Day Interval Routine', 'Apply→Massage→Soothe'],
    metrics: [
      { labelKo: '집중 케어', labelEn: 'Intensive Care', value: '3', unitKo: '개', unitEn: 'pcs', noteKo: '주사기형 집중 케어 3회분', noteEn: '3-use syringe intensive care' },
      { labelKo: '진정 앰플', labelEn: 'Soothing Ampoule', value: '3', unitKo: '개', unitEn: 'pcs', noteKo: '양파 추출 진정 앰플 3회분', noteEn: '3-use onion extract soothing ampoule' },
      { labelKo: '케어 주기', labelEn: 'Care Cycle', value: '3', unitKo: '일', unitEn: 'Days', noteKo: '3일 간격 루틴', noteEn: '3-day interval routine' },
      { labelKo: '스피큘', labelEn: 'Spicule', value: '270', unitKo: 'μm', unitEn: 'μm', noteKo: '맑고 탄탄한 피부 인상', noteEn: 'Clear and firm skin impression' },
    ],
    points: [
      { titleKo: '집중 케어 3회분 + 진정 3회분', titleEn: '3 Intensive + 3 Soothing', descKo: '주사기형 제품 3개는 집중 케어를, 바이알 앰플 3개는 진정 단계를 맡아 한 세트 안에서 역할이 분명하게 나뉩니다. 사용할 때마다 어떤 순서로 관리가 이어지는지 더 쉽게 떠올릴 수 있습니다.', descEn: '3 syringe products handle intensive care while 3 vial ampoules handle the soothing stage, with clearly defined roles within one set. Easy to remember the order of care each time.' },
      { titleKo: '미세하게, 그러나 분명하게 느껴지는 스피큘 케어', titleEn: 'Subtle Yet Clearly Felt Spicule Care', descKo: '바르는 순간 너무 가볍게 지나가지 않고, 피부 위에 한 번 더 손이 가게 되는 존재감을 담았습니다. 데일리 케어보다 한 단계 더 선명한 루틴을 원할 때 잘 어울립니다.', descEn: 'Not too light to pass unnoticed, but with a presence that makes you want to touch your skin again. Perfect when you want a routine one step more defined than daily care.' },
      { titleKo: '양파 추출 진정 앰플로 마무리', titleEn: 'Onion Extract Soothing Ampoule Finish', descKo: '집중 케어 뒤에도 편안한 마무리가 중요합니다. 양파 추출 진정 앰플이 함께 있어 피부를 한 번 더 부드럽게 정돈해 줍니다.', descEn: 'A comfortable finish is important even after intensive care. The onion extract soothing ampoule gently refines skin one more time.' },
      { titleKo: '한눈에 보이는 루틴 구성', titleEn: 'Routine Visible at a Glance', descKo: '집중 케어와 진정 케어가 한눈에 구분되어 보여, 집에서도 순서를 따라 사용하기 좋은 구성을 완성했습니다. 처음 써도 이해하기 쉬운 세트입니다.', descEn: 'Intensive care and soothing care are clearly distinguishable at a glance, making it easy to follow the order at home. A set that is easy to understand even for first-time users.' },
    ],
    steps: [
      { stepKo: 'STEP 01', stepEn: 'STEP 01', descKo: '저녁 세안 후 스킨케어 첫 단계에서 시작해 주세요.', descEn: 'Start at the first step of skincare after evening cleansing.' },
      { stepKo: 'STEP 02', stepEn: 'STEP 02', descKo: '주사기형 제품을 얼굴에 고르게 펴 바르며 집중 케어 루틴을 시작해 주세요.', descEn: 'Apply the syringe product evenly over the face to begin the intensive care routine.' },
      { stepKo: 'STEP 03', stepEn: 'STEP 03', descKo: '손끝으로 약 2분간 천천히 마사지해 제품이 피부에 고르게 자리 잡도록 도와주세요.', descEn: 'Slowly massage with fingertips for about 2 minutes to help the product settle evenly into skin.' },
      { stepKo: 'STEP 04', stepEn: 'STEP 04', descKo: '양파 추출 진정 앰플을 가볍게 두드려 흡수시켜, 집중 케어 후 피부를 편안하게 정리해 주세요.', descEn: 'Gently pat the onion extract soothing ampoule to absorb, comfortably finishing skin after intensive care.' },
    ],
    specs: [
      { labelKo: '세트 구성', labelEn: 'Set Contents', value: '주사기형 3개 + 바이알 앰플 3개' },
      { labelKo: '스피큘 길이', labelEn: 'Spicule Length', value: '270μm' },
      { labelKo: '진정 성분', labelEn: 'Soothing Ingredient', value: '양파 추출물' },
      { labelKo: '케어 주기', labelEn: 'Care Cycle', value: '3일 간격' },
      { labelKo: '루틴 흐름', labelEn: 'Routine Flow', value: '도포 → 마사지 → 진정' },
      { labelKo: '핵심 포인트', labelEn: 'Key Points', value: '맑고 탄탄한 피부 인상' },
      { labelKo: '사용 타이밍', labelEn: 'Usage Timing', value: '저녁 세안 후 스킨케어 첫 단계' },
      { labelKo: '추천 대상', labelEn: 'Recommended For', value: '집중 케어 + 진정 마무리 원하는 분' },
    ],
    forWhomKo: ['데일리 케어보다 더 선명한 변화를 원할 때', '스피큘 케어는 궁금하지만 마무리 진정도 중요할 때', '세트 구성에서 실용성과 만족감을 함께 보고 싶을 때'],
    forWhomEn: ['When you want a more defined change than daily care', 'When spicule care interests you but soothing finish is also important', 'When you want both practicality and satisfaction from a set'],
    closingKo: '"스피큘의 존재감은 분명하게, 마무리는 편안하게." 이 한 문장으로 정리되는 3개 + 3개 홈케어 세트입니다.',
    closingEn: '"Spicule presence clearly felt, finish comfortably." This one sentence sums up the 3+3 home care set.',
    price: 98000,
  },
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
