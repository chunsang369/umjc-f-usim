const fs = require('fs');
const path = require('path');

const locales = ['ko', 'en', 'zh', 'vi'];
const messagesDir = path.join(__dirname, 'messages');

const translationsToAdd = {
  ko: {
    plans: {
      filterModalTitle: "데이터 속도 설명",
      filterModalSubtitle: "원하는 데이터 속도를 기준으로 요금제를 확인해보세요",
      speed400Desc: "메세지는 되지만 사진은 느려요",
      speed1mbpsDesc: "720P 화질 동영상을 무리없이 볼 수 있어요.",
      speed5mbpsDesc: "사용하는데 어떤 무리도 없어요",
      reset: "초기화",
      viewResults: "{count}개 결과 보기"
    }
  },
  en: {
    plans: {
      filterModalTitle: "Data Speed Guide",
      filterModalSubtitle: "Check plans based on your desired data speed",
      speed400Desc: "Good for messaging, slow for photos",
      speed1mbpsDesc: "Watch 720P videos without buffering",
      speed5mbpsDesc: "Seamless experience for regular use",
      reset: "Reset",
      viewResults: "View {count} results"
    }
  },
  zh: {
    plans: {
      filterModalTitle: "网速说明",
      filterModalSubtitle: "根据您想要的网速查看套餐",
      speed400Desc: "发消息没问题，看图较慢",
      speed1mbpsDesc: "可流畅观看 720P 高清视频",
      speed5mbpsDesc: "日常使用毫无问题",
      reset: "重置",
      viewResults: "查看 {count} 个结果"
    }
  },
  vi: {
    plans: {
      filterModalTitle: "Hướng dẫn Tốc độ Data",
      filterModalSubtitle: "Xem các gói giá dựa trên tốc độ mong muốn của bạn",
      speed400Desc: "Tốt để nhắn tin, tải ảnh hơi chậm",
      speed1mbpsDesc: "Xem video 720P mượt mà",
      speed5mbpsDesc: "Sử dụng bình thường không có vấn đề",
      reset: "Đặt lại",
      viewResults: "Xem {count} kết quả"
    }
  }
};

locales.forEach(loc => {
  const filePath = path.join(messagesDir, `${loc}.json`);
  let data = {};
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  
  // Merge
  const mergeDeep = (target, source) => {
    for (const key in source) {
      if (source[key] instanceof Object && !Array.isArray(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  };
  
  data = mergeDeep(data, translationsToAdd[loc]);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${loc}.json for filter modal`);
});
