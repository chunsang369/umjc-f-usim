const fs = require('fs');
const path = require('path');

const locales = ['ko', 'en', 'zh', 'vi'];
const messagesDir = path.join(__dirname, 'messages');

const translationsToAdd = {
  ko: {
    hero: {
      title: "한국에서 폰 개통,",
      titleHighlight: "어려우셨죠?",
      subtitle: "안심정찰제로 숨겨진 비용 없이, 투명한 가격으로 시작하세요."
    },
    socialProof: {
      todaySignups: "오늘 {count}명 가입",
      totalSubscribers: "누적 {count}+ 가입자",
      countries: "30+ 국가"
    },
    plans: {
      sectionTitle: "추천 요금제를 만나보세요",
      sectionDesc: "외국인 전용 최저가 요금제를 비교해보세요",
      viewAllPlans: "모든 요금제 보기",
      filter: "필터",
      sortByRecommended: "추천순",
      month: "월",
      won: "원",
      tagForeignerOnly: "외국인 단독",
      tagUnder34: "만 34세 이하",
      tagRecommended: "추천",
      tagPlentyData: "데이터넉넉",
      tagUnlimitedLevel: "무제한급",
      unlimited: "기본제공(무제한)",
      included: "기본제공",
      promoNamePrefix: "[외국인 단독특가]",
      applyThisPlan: "이 요금제로 신청하기",
      priceDetails: "요금 상세 (Price Details / 12 months)",
      basePriceLabel: "기본료 (Base Price)",
      promoDiscountLabel: "프로모션 할인 (Promo)",
      contractDiscountLabel: "선택약정 할인 (Contract)",
      finalMonthlyPrice: "최종 월 요금 (Final)",
      importantNotes: "유의사항 (Important Notes)",
      note1: "위 요금은 12개월간 특가 프로모션이 적용된 최종 금액입니다.",
      note2: "13개월 차부터는 프로모션 할인이 종료되어 요금이 일부 변동될 수 있습니다.",
      note3: "알뜰폰 및 단독 프로모션은 외국인등록증(ARC)을 소지한 외국인 한정으로 가입 가능합니다.",
      monthPrefix: "월 "
    }
  },
  en: {
    hero: {
      title: "Getting a phone in Korea",
      titleHighlight: "shouldn't be this hard.",
      subtitle: "Fixed prices. No hidden fees. Start with confidence."
    },
    socialProof: {
      todaySignups: "{count} signed up today",
      totalSubscribers: "{count}+ subscribers",
      countries: "30+ countries"
    },
    plans: {
      sectionTitle: "Meet Our Recommended Plans",
      sectionDesc: "Compare the lowest priced plans exclusive for foreigners",
      viewAllPlans: "View all plans",
      filter: "Filter",
      sortByRecommended: "Recommended",
      month: "mo",
      won: "KRW",
      tagForeignerOnly: "Foreigner Only",
      tagUnder34: "Under 34",
      tagRecommended: "Recommended",
      tagPlentyData: "Rich Data",
      tagUnlimitedLevel: "Unlimited Level",
      unlimited: "Unlimited",
      included: "Included",
      promoNamePrefix: "[Exclusive Promo]",
      applyThisPlan: "Apply with this plan",
      priceDetails: "Price Details (12 months)",
      basePriceLabel: "Base Price",
      promoDiscountLabel: "Promo Discount",
      contractDiscountLabel: "Contract Discount",
      finalMonthlyPrice: "Final Monthly Price",
      importantNotes: "Important Notes",
      note1: "The above rate is the final price with a 12-month special promotion applied.",
      note2: "From the 13th month, the promotion discount ends and the rate may change slightly.",
      note3: "Budget phone and exclusive promotions are only available to foreigners holding an ARC.",
      monthPrefix: ""
    }
  },
  zh: {
    hero: {
      title: "在韩国办手机，",
      titleHighlight: "不用被坑。",
      subtitle: "透明价格，一键开通。无隐藏费用，安心使用。"
    },
    socialProof: {
      todaySignups: "今天{count}人注册",
      totalSubscribers: "累计{count}+用户",
      countries: "30+国家"
    },
    plans: {
      sectionTitle: "查看推荐套餐",
      sectionDesc: "比较外国人专属的最低价套餐",
      viewAllPlans: "查看所有套餐",
      filter: "筛选",
      sortByRecommended: "推荐排序",
      month: "月",
      won: "韩元",
      tagForeignerOnly: "外国人专属",
      tagUnder34: "34岁以下",
      tagRecommended: "推荐",
      tagPlentyData: "大流量",
      tagUnlimitedLevel: "无限级别",
      unlimited: "无限",
      included: "包含",
      promoNamePrefix: "[专属特惠]",
      applyThisPlan: "申请此套餐",
      priceDetails: "费用明细 (12个月)",
      basePriceLabel: "基本费用",
      promoDiscountLabel: "促销折扣",
      contractDiscountLabel: "合约折扣",
      finalMonthlyPrice: "最终月费",
      importantNotes: "注意事项",
      note1: "上述费用为适用12个月特别促销后的最终金额。",
      note2: "从第13个月起，促销折扣结束，费用可能会有变动。",
      note3: "实惠手机及专属促销仅限持有外国人登录证(ARC)的外国人申请。",
      monthPrefix: "每月 "
    }
  },
  vi: {
    hero: {
      title: "Đăng ký điện thoại ở Hàn Quốc,",
      titleHighlight: "không còn khó khăn nữa.",
      subtitle: "Giá cố định. Không có phí ẩn. Bắt đầu với sự tự tin."
    },
    socialProof: {
      todaySignups: "Hôm nay có {count} người đăng ký",
      totalSubscribers: "Hơn {count}+ người dùng",
      countries: "Hơn 30+ quốc gia"
    },
    plans: {
      sectionTitle: "Xem các Gói Đề Xuất của chúng tôi",
      sectionDesc: "So sánh các gói giá thấp nhất dành riêng cho người nước ngoài",
      viewAllPlans: "Xem tất cả các gói",
      filter: "Bộ lọc",
      sortByRecommended: "Đề xuất",
      month: "tháng",
      won: "Won",
      tagForeignerOnly: "Chỉ người N.Ngoài",
      tagUnder34: "Dưới 34 tuổi",
      tagRecommended: "Đề xuất",
      tagPlentyData: "Nhiều Data",
      tagUnlimitedLevel: "Mức Không giới hạn",
      unlimited: "Không giới hạn",
      included: "Đã bao gồm",
      promoNamePrefix: "[Khuyến mãi Tương K]",
      applyThisPlan: "Đăng ký gói này",
      priceDetails: "Chi tiết Giá (12 tháng)",
      basePriceLabel: "Giá Cơ bản",
      promoDiscountLabel: "Giảm giá Khuyến mãi",
      contractDiscountLabel: "Giảm giá Hợp đồng",
      finalMonthlyPrice: "Giá hàng tháng Cuối cùng",
      importantNotes: "Lưu ý Quan trọng",
      note1: "Mức giá trên là giá cuối cùng sau khi áp dụng khuyến mãi đặc biệt trong 12 tháng.",
      note2: "Từ tháng thứ 13, chiết khấu khuyến mãi sẽ kết thúc và mức giá có thể thay đổi nhẹ.",
      note3: "Điện thoại giá rẻ và các chương trình khuyến mãi độc quyền chỉ áp dụng cho người nước ngoài có thẻ ARC.",
      monthPrefix: "Mỗi tháng "
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
  console.log(`Updated ${loc}.json`);
});
