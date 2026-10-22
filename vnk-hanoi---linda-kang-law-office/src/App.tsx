import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Scale, 
  Gavel, 
  Briefcase, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  MessageSquare, 
  Globe,
  ArrowRight,
  ChevronDown,
  Building2,
  Landmark,
  FileWarning,
  AlertTriangle,
  Clock,
  CheckSquare,
  TrendingUp,
  Users,
  X
} from 'lucide-react';

// --- Types ---
type Language = 'ko' | 'en' | 'zh';

interface Content {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    specialties: string[];
    limitedNotice: string;
    emergencyNotice: string;
  };
  intro: {
    title: string;
    content: string;
    highlight: string;
  };
  empathy: {
    title: string;
    points: string[];
  };
  flagship: {
    tag: string;
    title: string;
    story: string[];
    result: string;
  };
  cases: {
    title: string;
    items: {
      title: string;
      desc: string;
      result: string;
    }[];
  };
  authority: {
    title: string;
    points: {
      title: string;
      desc: string;
    }[];
  };
  filter: {
    title: string;
    subtitle: string;
    requirements: string[];
  };
  closing: {
    text: string;
    author: string;
  };
  disputeTypes: {
    title: string;
    intro: string;
    items: string[];
    outro: string;
    cta: string;
  };
  realResolutions: {
    title: string;
    items: {
      title: string;
      amount?: string;
      problem: string;
      result: string;
    }[];
  };
  emergency: {
    title: string;
    content: string;
    cta: string;
    warning: {
      title: string;
      subtitle: string;
    };
  };
  guide: {
    title: string;
    content: string;
    services: string[];
  };
  process: {
    title: string;
    steps: {
      title: string;
      desc: string;
    }[];
  };
  centerName: string;
  cta: {
    title: string;
    subtitle: string;
    intro: string;
    form: {
      name: string;
      phone: string;
      case_type: {
        label: string;
        options: {
          general: string;
          urgent: string;
          business: string;
          real_estate: string;
        };
      };
      message: string;
      submit: string;
      success: string;
      error: string;
      notice: {
        title: string;
        content: string;
      };
    };
  };
  seo: string;
  strategyCta: string;
  targetClients: {
    title: string;
    items: string[];
  };
  welcomeModal: {
    title: string;
    content: string;
    cta: string;
  };
  faq: {
    title: string;
    items: {
      q: string;
      a: string;
    }[];
  };
}

const translations: Record<Language, Content> = {
  ko: {
    hero: {
      title:"20년 동안 해결되지 않은 사건\nVNK HANOI는 5개월 만에 해결합니다",
      subtitle: "복잡한 분쟁을 해결하는 베트남 전략 법률 대응 본부",
      cta: "무료1차 상담받기",
      specialties: ["토지 분쟁", "기업 분쟁", "정부 조사 대응", "세무 문제", "장기 미결 사건"],
      limitedNotice: "현재 진행 중인 사건이 많아 신규 상담은 제한적으로 진행됩니다.",
      emergencyNotice: "⚠ 긴급 사건은 24시간 내 대응 방향을 안내드립니다."
    },
    intro: {
      title: "외국 투자자를 위한 베트남 분쟁 대응",
      content: "베트남에서 사업을 진행하는 외국 투자자들은\n법률 환경과 비즈니스 문화 차이로 인해 다양한 분쟁을 겪을 수 있습니다.",
      highlight: "VNK HANOI는 외국 투자자가 겪는 투자 분쟁에 대해\n전략적인 대응을 제공합니다."
    },
    empathy: {
      title: "당신이 겪고 있는 고통을 이해합니다.",
      points: [
        "수년간의 법적 다툼으로 몸과 마음이 지쳐버린 상태",
        "기존 변호사들의 무능함과 무책임에 대한 깊은 불신",
        "정부 기관이나 파트너의 압박으로 인한 극심한 스트레스",
        "자산, 토지, 혹은 기업 전체를 잃을지도 모른다는 공포"
      ]
    },
    flagship: {
      tag: "대표 성공 사례",
      title: "연 매출 1조 원 기업의 베트남 퇴출 위기를 막아내다",
      story: [
        "연 매출 1조 원이 넘는 대기업이 내부 문제와 정부의 압박으로 베트남 공장 폐쇄 위기에 처했습니다. 정부 기관은 매일같이 압박을 가했고, 공장 가동 중단은 시간 문제였습니다.",
        "CEO는 수면제 없이는 잠을 이룰 수 없는 극도의 스트레스 속에 있었고, 이미 여러 경로로 해결을 시도했으나 모두 실패한 상태였습니다. 결국 우리 팀이 '마지막 희망'으로 투입되었습니다.",
        "우리는 즉각적인 협상 대신 사건의 본질을 파고들었습니다. 내부 정보 유출, 과거 협상 과정, 그리고 기업이 차마 밝히지 못했던 숨겨진 문제들까지 하나하나 조사했습니다.",
        "정부의 압박이 최고조에 달했을 때, 우리는 정부 기관의 '절차적 오류'를 발견했습니다. 100여 명의 공무원이 50인승 버스 두 대에 나눠 타고 압박해 오던 결정적인 순간, 우리는 그 오류를 바탕으로 전략적 협상을 이끌어냈습니다."
      ],
      result: "결과: 공장은 폐쇄되지 않았고, 기업은 베트남에서 성공적으로 사업을 지속하고 있습니다."
    },
    cases: {
      title: "불가능을 가능으로 바꾼 기록들",
      items: [
        {
          title: "20년 토지 분쟁의 종결",
          desc: "5명의 변호사를 거치며 20년간 해결되지 않던 토지 분쟁 사건",
          result: "5개월 만에 완전 해결"
        },
        {
          title: "7년 숙원, 핑크북 발급",
          desc: "공장 부지 레드북(핑크북)을 7년간 받지 못해 발만 동동 구르던 사례",
          result: "2개월 만에 발급 완료"
        },
        {
          title: "아파트 개발사 상대 승소",
          desc: "레드북 발급을 거부하는 대형 개발사를 상대로 한 소송",
          result: "승소 및 전액 보상 판결"
        }
      ]
    },
    authority: {
      title: "왜 우리여야만 하는가",
      points: [
        { title: "20년 이상의 분쟁 해결 노하우", desc: "베트남 법조계와 행정 절차에 대한 깊은 통찰력" },
        { title: "정부 기관 상대 협상 전문가", desc: "복잡한 행정 조사 및 규제 문제 해결의 독보적 실적" },
        { title: "난해한 사건 전문", desc: "다른 곳에서 포기한 사건일수록 우리의 가치는 빛납니다" }
      ]
    },
    filter: {
      title: "우리는 모든 사건을 맡지 않습니다.",
      subtitle: "우리는 오직 승리가 절실하고 가치가 높은 사건에만 집중합니다.",
      requirements: [
        "수년간 해결되지 않은 장기 미결 사건",
        "이미 다른 변호사를 고용했으나 실패한 사건",
        "경제적 이해관계가 매우 큰 고액 자산/기업 사건",
        "토지, 기업, 세무 등 정부 기관과 얽힌 복잡한 문제"
      ]
    },
    closing: {
      text: "어떤 사건들은 처음에는 단순한 문제로 시작됩니다. 하지만 시간이 흐르고, 실수가 반복되고, 실패한 시도들이 쌓이면서 걷잡을 수 없이 복잡해집니다. 그제야 사람들은 우리를 찾아옵니다.",
      author: "VNK HANOI - Linda Kang Law Office (베트남 외국인 투자자 분쟁 전략 센터)"
    },
    disputeTypes: {
      title: "베트남 투자자들이 가장 많이 겪는 분쟁",
      intro: "베트남에서 사업을 진행하는 외국 투자자들은 다양한 법률 및 투자 분쟁을 경험할 수 있습니다. 특히 다음과 같은 문제는 매우 자주 발생합니다.",
      items: [
        "베트남 파트너가 투자금을 반환하지 않는 사건",
        "명의신탁 토지 또는 자산 반환 분쟁",
        "회사 지분 및 경영권 분쟁",
        "세관 및 세무 조사로 인한 사업 위기",
        "계약 위반 및 투자 사기 사건"
      ],
      outro: "이러한 사건은 초기 대응 전략에 따라 결과가 크게 달라질 수 있습니다. 사건의 상황을 정확히 분석하고 전략적으로 대응하는 것이 매우 중요합니다.",
      cta: "투자 분쟁 전략 상담 요청"
    },
    realResolutions: {
      title: "실제 해결 사례",
      items: [
        {
          title: "한국 투자자 투자금 회수 사건",
          amount: "약 30억 원",
          problem: "베트남 파트너가 회사 지분 이전을 거부하고 투자금을 반환하지 않는 상황",
          result: "협상 및 법률 대응을 통해 투자금 일부 회수 및 분쟁 해결"
        },
        {
          title: "외국 제조기업 세관 분쟁 사건",
          problem: "세관 조사로 인해 공장 운영이 중단될 위기",
          result: "세관 문제 해결 후 정상적으로 사업 재개"
        },
        {
          title: "외국 투자자 지분 분쟁 사건",
          problem: "현지 파트너와의 경영권 분쟁 발생",
          result: "지분 구조 조정 및 합의를 통해 분쟁 해결"
        }
      ]
    },
    emergency: {
      title: "베트남 투자 분쟁은 시간이 중요합니다",
      content: "베트남에서 발생하는 투자 분쟁은 초기 대응이 매우 중요합니다. 초기 대응이 늦어질 경우 투자금 회수 가능성이 크게 낮아질 수 있습니다. 사건의 현재 상황을 상담하고 가능한 대응 전략을 안내드립니다.",
      cta: "긴급 사건 전략 상담 요청",
      warning: {
        title: "대응이 늦어지면 투자금 회수 가능성이 급격히 낮아집니다.",
        subtitle: "초기 대응이 늦어질수록 협상력과 법적 대응 수단이 제한됩니다."
      }
    },
    guide: {
      title: "외국 투자자를 위한 분쟁 대응",
      content: "베트남에서 사업을 진행하는 외국 투자자들은 법률 환경과 비즈니스 문화의 차이로 인해 다양한 분쟁을 겪을 수 있습니다. VNK HANOI는 외국 투자자들이 겪는 복잡한 투자 분쟁에 대해 전략적인 대응을 지원합니다.",
      services: ["투자금 회수", "지분 분쟁", "자산 반환", "세관 및 세무 문제", "계약 분쟁 등"]
    },
    process: {
      title: "상담 진행 과정",
      steps: [
        { title: "사건 내용 접수", desc: "작성해주신 사건 내용을 상담합니다." },
        { title: "1차 상담 및 분석", desc: "사건의 상황과 대응 가능성을 상담합니다." },
        { title: "대응 전략 안내", desc: "사건 해결을 위한 가능한 대응 전략을 안내드립니다." },
        { title: "필요 시 정식 사건 진행", desc: "사건의 규모와 상황에 따라 정식 대응이 진행됩니다." }
      ]
    },
    centerName: "베트남 외국인 투자자 분쟁 전략 센터",
    cta: {
      title: "사건 상담 요청",
      subtitle: "우리는 복잡성과 가치가 우리의 기준에 부합하는 사건만을 수임합니다.",
      intro: "현재 겪고 있는 사건의 내용을 간단히 작성해 주십시오. 내용을 상담 후 연락드리겠습니다.\n\n1. 사건 유형\n2. 사건 발생 시기\n3. 현재 상황\n4. 투자 금액 또는 피해 규모",
      form: {
        name: "성함",
        phone: "연락처 (카카오톡 ID 가능)",
        case_type: {
          label: "상담 유형",
          options: {
            general: "일반 법률 상담",
            urgent: "긴급 상담 (투자분쟁/체포 등)",
            business: "기업 법무",
            real_estate: "부동산/계약"
          }
        },
        message: "상담 내용을 간략히 적어주세요",
        submit: "무료 상담 신청 →",
        success: "✅ 접수되었습니다. 곧 연락드리겠습니다.",
        error: "오류가 발생했습니다. 직접 연락 부탁드립니다.",
        notice: {
          title: "무료1차 상담 안내",
          content: "작성해주신 사건 내용은 1차적으로 상담 후 연락드립니다.\n\n모든 사건을 수임하는 것은 아니며\n상담 결과에 따라 대응 가능 여부를 안내드립니다.\n\n사건의 복잡성에 따라 추가 상담이 필요한 경우\n전략 상담이 진행될 수 있습니다."
        }
      }
    },
    seo: "베트남 투자 분쟁, 투자금 회수 문제, 베트남 파트너 분쟁, 명의신탁 토지 반환 문제, 회사 지분 분쟁 등 외국 투자자가 베트남에서 겪는 다양한 법률 문제에 대한 대응 전략을 제공합니다.",
    strategyCta: "전략 상담 진행하기",
    targetClients: {
      title: "이런 기업들이 비슷한 문제를 겪습니다",
      items: [
        "한국 투자 기업",
        "중국 제조 기업",
        "외국 합작 투자 회사",
        "베트남 파트너 투자 프로젝트"
      ]
    },
    faq: {
      title: "자주 묻는 질문",
      items: [
        {
          q: "상담 비용이 발생합니까?",
          a: "사건 내용은 1차적으로 무료 상담 후 연락드립니다."
        },
        {
          q: "사건이 해결 가능하지 않으면 어떻게 됩니까?",
          a: "상담 결과에 따라 대응 가능 여부를 안내드립니다."
        },
        {
          q: "외국 기업도 상담이 가능합니까?",
          a: "한국어, 영어, 중국어 상담이 가능합니다"
        }
      ]
    },
    welcomeModal: {
      title: "안녕하세요. VNK HANOI 베트남 투자분쟁 전략센터입니다.",
      content: "현재 외국인 투자 분쟁 사건은\n선별적으로 상담 후 진행하고 있습니다.\n\n정확한 판단을 위해 아래 4가지만 간단히 보내주세요.\n\n1. 사건 유형 (예: 투자금 미회수 / 계약 분쟁 등)\n2. 상대방 (회사 / 개인 / 정부기관)\n3. 피해 금액 또는 투자 규모\n4. 긴급 여부 (긴급 / 일반)\n\n※ 고액 및 긴급 사건부터 우선 상담됩니다.\n※ 단순 문의는 별도 답변이 제한될 수 있습니다.",
      cta: "확인했습니다"
    }
  },
  en: {
    hero: {
      title: "Cases Unresolved for 20 Years,\nWe Solved in 5 Months.",
      subtitle: "The last problem-solver for cases other lawyers could not resolve.",
      cta: "Get Free Initial Review",
      specialties: ["Land Disputes", "Corporate Disputes", "Government Investigations", "Tax Issues", "Long Unresolved Cases"],
      limitedNotice: "Due to a high volume of ongoing cases, new consultations are currently limited.",
      emergencyNotice: "⚠ For emergency cases, we provide response guidance within 24 hours."
    },
    intro: {
      title: "Vietnam Dispute Response for Foreign Investors",
      content: "Foreign investors doing business in Vietnam\nmay face various disputes due to differences in the legal environment and business culture.",
      highlight: "VNK HANOI provides strategic responses to investment disputes\nfaced by foreign investors."
    },
    empathy: {
      title: "We understand your exhaustion.",
      points: [
        "Exhausted from years of legal battles that lead nowhere",
        "Deep distrust in the incompetence of previous legal counsel",
        "Severe stress from government pressure or hostile partners",
        "Fear of losing assets, land, or your entire company"
      ]
    },
    flagship: {
      tag: "Flagship Success Story",
      title: "Saving a $1B Revenue Company from Total Shutdown",
      story: [
        "A major corporation with over $1B in annual revenue faced a total factory shutdown in Vietnam due to internal leaks and government pressure. Authorities applied daily pressure, threatening immediate closure.",
        "The CEO was under such extreme stress that sleep was impossible without medication. Every previous attempt to resolve the issue had failed. Our firm was brought in as the absolute 'last option'.",
        "Instead of immediate negotiation, we dug into the core. We investigated internal leaks, past negotiation failures, and hidden issues the company hadn't disclosed initially.",
        "As pressure peaked, we discovered a critical 'procedural mistake' by the authorities. During a confrontation with 100+ officials arriving in two buses, we used this discovery to turn the tide of negotiation."
      ],
      result: "Result: The factory remained open. The company survived and continues to thrive in Vietnam."
    },
    cases: {
      title: "Records of Turning Impossible to Possible",
      items: [
        {
          title: "20-Year Land Dispute",
          desc: "Unresolved for two decades through five different lawyers",
          result: "Fully resolved in 5 months"
        },
        {
          title: "7-Year Red Book Delay",
          desc: "Factory land title (Red Book) stuck for 7 years",
          result: "Issued in 2 months"
        },
        {
          title: "Litigation vs Developer",
          desc: "Lawsuit against a major developer refusing to issue titles",
          result: "Won with full compensation"
        }
      ]
    },
    authority: {
      title: "Why We Are the Final Choice",
      points: [
        { title: "20+ Years of Resolution", desc: "Deep insight into Vietnamese legal and administrative systems" },
        { title: "Government Negotiation Experts", desc: "Unrivaled track record in handling complex regulatory issues" },
        { title: "Specialization in Complexity", desc: "The more difficult the case, the more our expertise shines" }
      ]
    },
    filter: {
      title: "We Do Not Accept Every Case.",
      subtitle: "We focus exclusively on high-value cases where victory is paramount.",
      requirements: [
        "Long-term unresolved disputes lasting years",
        "Cases already failed by other legal counsel",
        "High-stakes financial interests (Corporate/Private)",
        "Complex matters involving Land, Tax, or Government agencies"
      ]
    },
    closing: {
      text: "Some cases begin as simple problems. But after years of delays, mistakes, and failed attempts, they become extremely complex. When that happens, people come to us.",
      author: "VNK HANOI - Linda Kang Law Office (Foreign Investor Dispute Strategy Center – Vietnam)"
    },
    disputeTypes: {
      title: "Common Disputes Faced by Foreign Investors in Vietnam",
      intro: "Foreign investors doing business in Vietnam may experience various legal and investment disputes. The following issues occur very frequently:",
      items: [
        "Cases where Vietnamese partners do not return investment funds",
        "Disputes over the return of nominee-held land or assets",
        "Corporate share and management control disputes",
        "Business crises caused by customs and tax investigations",
        "Contract violations and investment fraud cases"
      ],
      outro: "The outcome of these cases can vary greatly depending on the initial response strategy. It is crucial to accurately analyze the situation and respond strategically.",
      cta: "Request Investment Dispute Strategy Consultation"
    },
    realResolutions: {
      title: "Real Resolution Cases",
      items: [
        {
          title: "Korean Investor Fund Recovery Case",
          amount: "Approx. $2.2M",
          problem: "Vietnamese partner refused to transfer company shares and return investment funds",
          result: "Recovered partial investment and resolved dispute through negotiation and legal action"
        },
        {
          title: "Foreign Manufacturing Company Customs Dispute",
          problem: "Factory operation at risk of shutdown due to customs investigation",
          result: "Resumed business operations normally after resolving customs issues"
        },
        {
          title: "Foreign Investor Share Dispute",
          problem: "Management control dispute with local partner",
          result: "Resolved dispute through share restructuring and settlement"
        }
      ]
    },
    emergency: {
      title: "Time is Critical in Vietnam Investment Disputes",
      content: "Initial response is vital for investment disputes in Vietnam. If the initial response is delayed, the possibility of fund recovery may significantly decrease. We review the current situation and guide you through possible response strategies.",
      cta: "Request Emergency Case Strategy Consultation",
      warning: {
        title: "Delayed response drastically reduces the chances of fund recovery.",
        subtitle: "The later the initial response, the more limited your negotiation power and legal remedies become."
      }
    },
    guide: {
      title: "Dispute Response for Foreign Investors",
      content: "Foreign investors in Vietnam may face various disputes due to differences in the legal environment and business culture. VNK HANOI supports strategic responses to complex investment disputes faced by foreign investors.",
      services: ["Fund Recovery", "Share Disputes", "Asset Return", "Customs & Tax Issues", "Contract Disputes, etc."]
    },
    process: {
      title: "Consultation Process",
      steps: [
        { title: "Case Submission", desc: "We review the case details you submitted." },
        { title: "Initial Case Analysis", desc: "We review the situation and the possibility of response." },
        { title: "Response Strategy Guidance", desc: "We guide you through possible response strategies for resolving the case." },
        { title: "Formal Case Proceeding if Necessary", desc: "Formal response proceeds depending on the scale and situation of the case." }
      ]
    },
    centerName: "Foreign Investor Dispute Strategy Center – Vietnam",
    cta: {
      title: "Request Case Review",
      subtitle: "We only accept cases that meet our criteria for complexity and value.",
      intro: "Please briefly describe the case you are currently experiencing. We will contact you after reviewing the content.\n\n1. Case Type\n2. Time of Occurrence\n3. Current Situation\n4. Investment Amount or Scale of Damage",
      form: {
        name: "Name",
        phone: "Contact Info (KakaoTalk ID possible)",
        case_type: {
          label: "Consultation Type",
          options: {
            general: "General Legal Consultation",
            urgent: "Urgent Consultation (Investment Dispute/Arrest, etc.)",
            business: "Corporate Law",
            real_estate: "Real Estate/Contract"
          }
        },
        message: "Briefly describe your consultation needs",
        submit: "Apply for Free Consultation →",
        success: "✅ Submitted successfully. We will contact you soon.",
        error: "An error occurred. Please contact us directly.",
        notice: {
          title: "Free Initial Case Review Guide",
          content: "The case details you provide will be reviewed initially before we contact you.\n\nWe do not accept all cases, and we will inform you of our ability to respond based on the review results.\n\nIf further consultation is required depending on the complexity of the case, a strategic consultation may be conducted."
        }
      }
    },
    seo: "We provide response strategies for various legal issues faced by foreign investors in Vietnam, such as investment disputes, fund recovery issues, partner disputes, nominee land return issues, and corporate share disputes.",
    strategyCta: "Proceed with Strategic Consultation",
    targetClients: {
      title: "Companies Facing Similar Challenges",
      items: [
        "Korean Investment Companies",
        "Chinese Manufacturing Entities",
        "Foreign Joint Venture Firms",
        "Vietnam Partner Investment Projects"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Is there a consultation fee?",
          a: "We provide an initial review of your case free of charge before contacting you."
        },
        {
          q: "What if the case cannot be resolved?",
          a: "We will inform you whether we can handle the case based on the review results."
        },
        {
          q: "Are consultations available for foreign companies?",
          a: "Yes, we provide consultations in Korean, English, and Chinese."
        }
      ]
    },
    welcomeModal: {
      title: "Hello. This is VNK HANOI Vietnam Investment Dispute Strategy Center.",
      content: "Currently, foreign investment dispute cases are\nbeing processed after selective review.\n\nFor an accurate assessment, please briefly provide the following 4 items.\n\n1. Case Type (e.g., Non-recovery of investment / Contract dispute, etc.)\n2. Counterparty (Company / Individual / Government agency)\n3. Damage amount or Investment scale\n4. Urgency (Urgent / Normal)\n\n※ High-value and urgent cases are reviewed first.\n※ Responses to simple inquiries may be limited.",
      cta: "I understand"
    }
  },
  zh: {
    hero: {
      title: "20年未决案件，\n我们在5个月内圆满解决。",
      subtitle: "专为其他律师无法解决的疑难案件提供最终方案。",
      cta: "获取免费初步审查",
      specialties: ["土地纠纷", "企业纠纷", "政府调查应对", "税务问题", "长期未决案件"],
      limitedNotice: "由于目前正在进行的案件较多，新咨询的受理受到限制。",
      emergencyNotice: "⚠ 对于紧急案件，我们将在24小时内提供应对方案。"
    },
    intro: {
      title: "面向外国投资者的越南纠纷应对",
      content: "在越南开展业务的外国投资者\n可能会因法律环境和商业文化的差异而面临各种纠纷。",
      highlight: "VNK HANOI 为外国投资者面临的投资纠纷\n提供战略性应对方案。"
    },
    empathy: {
      title: "我们深知您的疲惫与焦虑。",
      points: [
        "多年法律诉讼无果，身心俱疲",
        "对前任律师的无能与不负责任深感失望",
        "面对政府部门或合作伙伴的压力，承受巨大压力",
        "担心失去资产、土地或整个企业的恐惧"
      ]
    },
    flagship: {
      tag: "旗舰成功案例",
      title: "挽救年营收万亿韩元企业免于被驱逐的危机",
      story: [
        "一家年营收超过1万亿韩元的大型企业因内部问题和政府压力，面临越南工厂关停的危机。政府机构每日施压，停产迫在眉睫。",
        "CEO承受着极大的压力，不靠安眠药无法入睡。此前尝试过多种途径解决均告失败。最终，我们团队作为“最后的希望”介入。",
        "我们没有立即进行谈判，而是深入挖掘案件本质。调查了内部信息泄露、过去的谈判过程，以及企业最初未敢透露的隐藏问题。",
        "在政府压力达到顶峰、百余名官员分乘两辆大巴前来施压的关键时刻，我们发现了政府机构的“程序性错误”，并以此为基础达成的战略性谈判。"
      ],
      result: "结果：工厂未被关停，企业在越南成功继续运营。"
    },
    cases: {
      title: "化不可能为可能的记录",
      items: [
        {
          title: "20年土地纠纷终结",
          desc: "历经5任律师、20年未决的土地纠纷案",
          result: "5个月内彻底解决"
        },
        {
          title: "7年夙愿，红皮书发放",
          desc: "工厂用地红皮书拖延7年无法办理",
          result: "2个月内办理完成"
        },
        {
          title: "起诉公寓开发商胜诉",
          desc: "针对拒绝发放红皮书的大型开发商提起诉讼",
          result: "胜诉并获得全额赔偿"
        }
      ]
    },
    authority: {
      title: "为什么选择我们",
      points: [
        { title: "20年以上纠纷解决经验", desc: "对越南法律界和行政程序有深刻洞察" },
        { title: "政府机构谈判专家", desc: "在处理复杂行政调查和监管问题方面业绩卓越" },
        { title: "疑难案件专家", desc: "越是别人放弃的案件，越能体现我们的价值" }
      ]
    },
    filter: {
      title: "我们不接受所有案件。",
      subtitle: "我们只专注于那些迫切需要胜利且价值重大的案件。",
      requirements: [
        "多年未决的长期疑难案件",
        "已聘请其他律师但以失败告终的案件",
        "涉及重大利益的高额资产/企业案件",
        "与土地、企业、税务等政府机构相关的复杂问题"
      ]
    },
    closing: {
      text: "有些案件起初只是简单的问题。但随着时间推移、错误重复以及失败尝试的累积，它们变得极其复杂。就在那时，人们找到了我们。",
      author: "VNK HANOI - Linda Kang Law Office (越南外国投资者纠纷战略中心)"
    },
    disputeTypes: {
      title: "越南投资者最常遇到的纠纷",
      intro: "在越南开展业务的外国投资者可能会遇到各种法律和投资纠纷。特别是以下问题非常频繁地发生：",
      items: [
        "越南合作伙伴不退还投资资金의 案例",
        "代持土地或资产退还纠纷",
        "公司股份及经营权纠纷",
        "因海关及税务调查导致的业务危机",
        "违约及投资诈骗案件"
      ],
      outro: "这些案件的结果可能会根据初期应对策略而大不相同。准确分析案件情况并进行战略性应对至关重要。",
      cta: "请求投资纠纷战略咨询"
    },
    realResolutions: {
      title: "实际解决案例",
      items: [
        {
          title: "韩国投资者投资款回收案例",
          amount: "约 30 亿韩元",
          problem: "越南合作伙伴拒绝转让公司股份且不退还投资款的情况",
          result: "通过谈判和法律应对回收部分投资款并解决纠纷"
        },
        {
          title: "外国制造企业海关纠纷案例",
          problem: "因海关调查面临工厂停产危机",
          result: "解决海关问题后正常恢复业务"
        },
        {
          title: "外国投资者股份纠纷案例",
          problem: "与当地合作伙伴发生经营权纠纷",
          result: "通过股份结构调整和达成协议解决纠纷"
        }
      ]
    },
    emergency: {
      title: "越南投资纠纷中时间至关重要",
      content: "在越南发生的投资纠纷中，初期应对非常重要。如果初期应对延迟，回收投资款的可能性可能会大大降低。我们将审查案件的当前情况并指导您采取可能的应对策略。",
      cta: "请求紧急案件战略咨询",
      warning: {
        title: "应对延迟将大幅降低投资款回收的可能性。",
        subtitle: "初期应对越晚，您的谈判能力和法律手段就越有限。"
      }
    },
    guide: {
      title: "外国投资者纠纷应对指南",
      content: "在越南开展业务的外国投资者可能会因法律环境和商业文化的差异而面临各种纠纷。VNK HANOI 支持外国投资者应对复杂的投资纠纷。",
      services: ["投资款回收", "股份纠纷", "资产退还", "海关及税务问题", "合同纠纷等"]
    },
    process: {
      title: "咨询流程",
      steps: [
        { title: "案件内容接收", desc: "我们将审查您提交的案件内容。" },
        { title: "初步案件分析", desc: "我们将审查案件情况和应对的可能性。" },
        { title: "应对策略指导", desc: "我们将指导您解决案件的可能应对策略。" },
        { title: "必要时正式启动案件", desc: "根据案件规模和情况，将进行正式应对。" }
      ]
    },
    centerName: "越南外国投资者纠纷战略中心",
    cta: {
      title: "请求案件评估",
      subtitle: "我们只接受符合我们复杂性和价值标准的案件。",
      intro: "请简要描述您目前正在经历的案件内容。我们将在审查内容后与您联系。\n\n1. 案件类型\n2. 发生时间\n3. 当前情况\n4. 投资金额或损失规模",
      form: {
        name: "姓名",
        phone: "联系方式 (可以是 KakaoTalk ID)",
        case_type: {
          label: "咨询类型",
          options: {
            general: "一般法律咨询",
            urgent: "紧急咨询 (投资纠纷/逮捕等)",
            business: "公司法务",
            real_estate: "房地产/合同"
          }
        },
        message: "请简要描述您的咨询内容",
        submit: "申请免费咨询 →",
        success: "✅ 已提交。我们将尽快与您联系。",
        error: "发生错误。请直接联系我们。",
        notice: {
          title: "免费初步案件评估指南",
          content: "我们将初步评估您提交的案件内容，然后与您联系。\n\n我们并不承接所有案件，将根据评估结果告知是否可以应对。\n\n根据案件的复杂程度，如果需要进一步咨询，可能会进行战略咨询。"
        }
      }
    },
    seo: "我们为外国投资者在越南面临的各种法律问题提供应对策略，如投资纠纷、投资款回收问题、合作伙伴纠纷、代持土地退还问题、公司股份纠纷等。",
    strategyCta: "进行战略咨询",
    targetClients: {
      title: "面临类似问题的企业",
      items: [
        "韩国投资企业",
        "中国制造企业",
        "外国合资公司",
        "越南合作伙伴投资项目"
      ]
    },
    faq: {
      title: "常见问题",
      items: [
        {
          q: "会产生咨询费用吗？",
          a: "我们将初步免费评估您提交的案件内容，然后与您联系。"
        },
        {
          q: "如果案件无法解决怎么办？",
          a: "我们将根据评估结果告知是否可以应对。"
        },
        {
          q: "外国企业也可以咨询吗？",
          a: "可以，我们提供韩语、英语、汉语咨询。"
        }
      ]
    },
    welcomeModal: {
      title: "您好。这里是 VNK HANOI 越南投资纠纷战略中心。",
      content: "目前，外国投资纠纷案件正在\n经过筛选审查后进行处理。\n\n为了准确评估，请简要提供以下 4 项内容。\n\n1. 案件类型（例如：投资款未回收 / 合同纠纷等）\n2. 交易对手（公司 / 个人 / 政府机构）\n3. 损失金额或投资规模\n4. 紧急程度（紧急 / 普通）\n\n※ 高价值和紧急案件将优先审查。\n※ 对简单查询的回复可能会受到限制。",
      cta: "我明白了"
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('ko');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    case_type: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);

  const content = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const webhookUrl = (import.meta as any).env.VITE_N8N_WEBHOOK_URL;
      if (!webhookUrl) {
        throw new Error('Webhook URL not configured');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language: lang,
          timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Ho_Chi_Minh' }),
          source: 'vnkhanoi.com'
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setSubmitStatus('success');
      setFormData({ name: '', phone: '', case_type: 'general', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-accent-600 selection:text-white">
      {/* Welcome Modal */}
      <AnimatePresence>
        {isWelcomeModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWelcomeModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass border border-accent-500/30 rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="p-8 md:p-10">
                <button 
                  onClick={() => setIsWelcomeModalOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/40" />
                </button>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-accent-600 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">
                    {content.welcomeModal.title}
                  </h3>
                </div>

                <div className="space-y-6 text-white/70 font-light leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {content.welcomeModal.content}
                </div>

                <button
                  onClick={() => setIsWelcomeModalOpen(false)}
                  className="w-full mt-10 py-5 bg-accent-600 text-white font-black text-lg rounded-2xl hover:bg-accent-500 transition-all shadow-xl shadow-accent-600/20"
                >
                  {content.welcomeModal.cta}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 group">
            <div className="relative flex items-center justify-center w-14 h-14">
              {/* Gold Glow Effect */}
              <div className="absolute inset-0 bg-accent-500/10 blur-xl rounded-full group-hover:bg-accent-500/20 transition-all" />
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-accent-600/30 bg-gradient-to-b from-accent-400/10 to-accent-900/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <Scale className="w-7 h-7 text-accent-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-accent-200 via-accent-500 to-accent-700 leading-none">
                VNK HANOI
              </span>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent-600/40 to-transparent my-1" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent-200/40 font-medium">
                Linda Kang Law Office
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            {/* Desktop Language Menu */}
            <div className="hidden md:flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-white/60">
              {(['ko', 'en', 'zh'] as Language[]).map((l) => (
                <button 
                  key={l}
                  onClick={() => setLang(l)}
                  className={`hover:text-accent-600 transition-colors ${lang === l ? 'text-accent-600' : ''}`}
                >
                  {l === 'ko' ? '한국어' : l === 'en' ? 'English' : '中文'}
                </button>
              ))}
            </div>

            {/* Mobile Language Toggle */}
            <div className="relative md:hidden">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all"
              >
                <Globe className="w-4 h-4 text-accent-500" />
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  {lang === 'ko' ? '한국어' : lang === 'en' ? 'EN' : '中文'}
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-32 glass border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
                  >
                    {(['ko', 'en', 'zh'] as Language[]).map((l) => (
                      <button 
                        key={l}
                        onClick={() => {
                          setLang(l);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-[10px] uppercase tracking-widest font-bold transition-colors hover:bg-white/5 ${lang === l ? 'text-accent-500 bg-white/5' : 'text-white/60'}`}
                      >
                        {l === 'ko' ? '한국어' : l === 'en' ? 'English' : '中文'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="https://t.me/linda_law_bot?start=consult"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block px-6 py-2 bg-accent-600 text-white font-bold text-sm rounded-full hover:bg-accent-500 transition-all"
            >
              {content.hero.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
            alt="Legal Background" 
            className="w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12 inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-accent-500/30">
              <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-accent-400">
                {content.centerName}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-[1.15]">
              {content.hero.title.split('\n').map((line, i) => (
                <span key={i} className={i === 1 ? 'accent-gradient block mt-2' : 'block'}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto font-light tracking-wide px-4">
              {content.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {content.hero.specialties.map((s, i) => (
                <span key={i} className="px-4 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase text-white/40">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a 
                href="https://t.me/linda_law_bot?start=consult"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-12 py-5 bg-accent-600 text-white font-black text-lg rounded-full overflow-hidden hover:scale-105 transition-transform"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {content.hero.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-5 rounded-full border border-white/20 bg-white/5 text-white font-bold text-lg hover:bg-white/10 transition-all"
              >
                {content.strategyCta}
              </button>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 space-y-3"
            >
              <div className="text-red-400 text-sm font-semibold tracking-wide">
                {content.hero.emergencyNotice}
              </div>
              <p className="text-white/30 text-[10px] uppercase tracking-widest">
                {content.hero.limitedNotice}
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-scroll" />
        </div>
      </section>
      
      {/* Intro Section */}
      <section className="py-32 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-balance">
                {content.intro.title}
              </h2>
              <div className="space-y-8">
                <p className="text-xl md:text-3xl text-white/60 font-light leading-relaxed whitespace-pre-line">
                  {content.intro.content}
                </p>
                <p className="text-xl md:text-3xl text-accent-500 font-medium leading-relaxed whitespace-pre-line">
                  {content.intro.highlight}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Empathy Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-12 leading-tight">
                {content.empathy.title}
              </h2>
              <div className="space-y-8">
                {content.empathy.points.map((p, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="mt-1 p-1 rounded-full bg-accent-600/10 border border-accent-600/20">
                      <AlertCircle className="w-5 h-5 text-accent-600" />
                    </div>
                    <p className="text-lg text-white/70 font-light leading-relaxed">{p}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden accent-border">
                <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000" 
                  alt="Professional Consultant" 
                  className="w-full h-full object-cover grayscale opacity-60"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-xl max-w-xs">
                <p className="text-accent-600 font-display italic text-xl mb-2">"The last option is often the only one that works."</p>
                <p className="text-white/40 text-xs uppercase tracking-widest">— VinaLegal Strategy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Case Story - Cinematic */}
      <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-600 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-600 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent-600 text-sm font-bold uppercase tracking-[0.4em] mb-4 block">
              {content.flagship.tag}
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              {content.flagship.title}
            </h2>
          </div>

          <div className="space-y-16">
            {content.flagship.story.map((para, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`flex gap-10 items-start ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="hidden md:block text-6xl font-display text-white/5 font-black shrink-0">
                  0{i + 1}
                </div>
                <div className="glass p-10 rounded-3xl relative">
                  <p className="text-xl text-white/80 leading-relaxed font-light italic">
                    {para}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="mt-20 p-12 rounded-3xl bg-accent-600 text-white text-center"
          >
            <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
              {content.flagship.result}
            </h3>
          </motion.div>
        </div>
      </section>

      {/* Additional Case Studies */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-20">
            {content.cases.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.cases.items.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass p-10 rounded-2xl flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-accent-600/10 flex items-center justify-center mb-8">
                    {i === 0 ? <Landmark className="text-accent-600" /> : i === 1 ? <FileText className="text-accent-600" /> : <Gavel className="text-accent-600" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/50 font-light mb-8">{item.desc}</p>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <span className="text-accent-600 font-bold uppercase tracking-widest text-sm">
                    {item.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 rounded-full bg-accent-600 text-white font-black uppercase tracking-widest hover:bg-accent-500 transition-all shadow-2xl shadow-accent-600/20"
            >
              {content.strategyCta}
            </button>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden accent-border">
                  <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=500" alt="Legal" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden mt-12 accent-border">
                  <img src="https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80&w=500" alt="Meeting" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-12">
                {content.authority.title}
              </h2>
              <div className="space-y-12">
                {content.authority.points.map((p, i) => (
                  <div key={i} className="group">
                    <h3 className="text-xl font-bold text-accent-600 mb-2 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5" /> {p.title}
                    </h3>
                    <p className="text-white/60 font-light text-lg leading-relaxed group-hover:text-white transition-colors">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-8 rounded-2xl bg-accent-600/5 border border-accent-600/20 mt-16 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Scale className="w-16 h-16 text-accent-500" />
                </div>
                <h3 className="text-xs font-black text-accent-500 mb-3 uppercase tracking-[0.3em]">
                  Specialized Strategic Unit
                </h3>
                <p className="text-xl md:text-2xl font-display font-bold text-white mb-3">
                  {content.centerName}
                </p>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  Our dedicated center focuses exclusively on high-stakes disputes for foreign entities, providing the ultimate strategic leverage in the Vietnamese legal landscape.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Filter */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass p-16 rounded-[40px] text-center border-accent-600/20">
            <div className="inline-flex p-4 rounded-full bg-red-500/10 mb-8">
              <FileWarning className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {content.filter.title}
            </h2>
            <p className="text-white/50 text-xl mb-12 font-light">
              {content.filter.subtitle}
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {content.filter.requirements.map((r, i) => (
                <div key={i} className="flex gap-3 items-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-accent-600"></div>
                  <span className="text-sm font-medium text-white/80">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="py-40 bg-[#050505] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <p className="font-display text-3xl md:text-5xl italic leading-relaxed text-white/90 mb-12">
              "{content.closing.text}"
            </p>
            <div className="w-20 h-[1px] bg-accent-600 mx-auto mb-8"></div>
            <p className="text-accent-600 font-bold uppercase tracking-[0.5em] text-sm">
              {content.closing.author}
            </p>
          </motion.div>
        </div>
      </section>

      {/* [추가 섹션 1] 투자 분쟁 유형 */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-600 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
              {content.disputeTypes.title}
            </h2>
            <p className="text-xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed">
              {content.disputeTypes.intro}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {content.disputeTypes.items.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-center p-6 rounded-2xl glass border border-white/5 hover:border-accent-600/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-accent-600/10 flex items-center justify-center shrink-0 group-hover:bg-accent-600/20 transition-colors">
                    <CheckSquare className="w-6 h-6 text-accent-600" />
                  </div>
                  <span className="text-lg font-medium text-white/80">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="glass p-12 rounded-[40px] border-accent-600/20">
              <p className="text-xl text-white/70 leading-relaxed mb-10 font-light italic">
                {content.disputeTypes.outro}
              </p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-6 rounded-2xl bg-accent-600 text-white font-black uppercase tracking-widest hover:bg-accent-700 transition-all flex items-center justify-center gap-3 group"
              >
                {content.disputeTypes.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 rounded-full bg-accent-600 text-white font-black uppercase tracking-widest hover:bg-accent-500 transition-all shadow-2xl shadow-accent-600/20"
            >
              {content.strategyCta}
            </button>
          </div>
        </div>
      </section>

      {/* [추가 섹션] 비슷한 문제를 겪는 기업들 */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
              {content.targetClients.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.targetClients.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-600/50 transition-all text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-accent-600/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-600/20 transition-colors">
                  <Building2 className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-white/90">
                  {item}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* [추가 섹션 2] 실제 해결 사례 */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-center mb-24">
            {content.realResolutions.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.realResolutions.items.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass p-10 rounded-3xl border border-white/5 flex flex-col h-full relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  {item.amount && (
                    <div className="inline-block px-4 py-1 rounded-full bg-accent-600/20 text-accent-500 text-sm font-black uppercase tracking-widest">
                      {item.amount}
                    </div>
                  )}
                </div>
                <div className="space-y-6 flex-grow">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold block mb-2">Problem</span>
                    <p className="text-white/60 font-light leading-relaxed">{item.problem}</p>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-accent-600 font-bold block mb-2">Result</span>
                    <p className="text-white font-medium leading-relaxed">{item.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* [추가 섹션 3] 긴급 대응 CTA */}
      <section className="py-32 bg-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex p-4 rounded-full bg-white/20 mb-10 animate-pulse">
            <Clock className="w-10 h-10 text-white" />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-12 bg-red-900/30 p-8 rounded-3xl border border-red-500/20 max-w-2xl mx-auto"
          >
            <div className="text-xl md:text-2xl font-bold text-red-400 mb-3">
              {content.emergency.warning.title}
            </div>
            <div className="text-base text-white/60 font-light">
              {content.emergency.warning.subtitle}
            </div>
          </motion.div>

          <h2 className="font-display text-4xl md:text-7xl font-bold text-white mb-8 leading-tight">
            {content.emergency.title}
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
            {content.emergency.content}
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 rounded-2xl bg-black text-white font-black uppercase tracking-[0.2em] hover:bg-zinc-900 transition-all shadow-2xl"
            >
              {content.emergency.cta}
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 rounded-2xl border-2 border-white text-white font-black uppercase tracking-[0.2em] hover:bg-white hover:text-accent-600 transition-all"
            >
              {content.strategyCta}
            </button>
          </div>
        </div>
      </section>

      {/* [추가 섹션 4] 외국 투자자 안내 */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-10 leading-tight">
                {content.guide.title}
              </h2>
              <p className="text-xl text-white/50 font-light leading-relaxed mb-12">
                {content.guide.content}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {content.guide.services.map((service, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden accent-border">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" 
                  alt="Legal Strategy" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-10 rounded-3xl border-accent-600/30 hidden md:block">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-accent-600 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Expertise</p>
                    <p className="text-xl font-bold">Foreign Investment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Process Section */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
              {content.process.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {content.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-2xl glass border border-white/5"
              >
                <div className="text-4xl font-display text-accent-600/20 font-black mb-6">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-white/50 font-light leading-relaxed">
                  {step.desc}
                </p>
                {i < content.process.steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-accent-600/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
              {content.faq.title}
            </h2>
          </div>
          <div className="space-y-6">
            {content.faq.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl glass border border-white/5 hover:border-accent-600/30 transition-all"
              >
                <div className="flex gap-6">
                  <div className="text-accent-600 font-display text-2xl font-bold">Q.</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {item.q}
                    </h3>
                    <p className="text-white/60 font-light leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-black py-10 text-center">
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-12 py-6 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all shadow-2xl"
        >
          {content.strategyCta}
        </button>
      </div>

      {/* Final CTA Form */}
      <section id="contact" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight">
                {content.cta.title}
              </h2>
              <p className="text-xl text-white/50 font-light mb-12 whitespace-pre-line">
                {content.cta.intro}
              </p>
              <p className="text-sm text-white/30 font-light">
                {content.cta.subtitle}
              </p>
            </div>
            
            <div className="glass p-12 rounded-3xl">
              <div className="mb-10 p-6 rounded-2xl bg-accent-600/5 border border-accent-600/20">
                <h3 className="text-accent-500 font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {content.cta.form.notice.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">
                  {content.cta.form.notice.content}
                </p>
              </div>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                    {content.cta.form.name}
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-600 transition-colors"
                    placeholder="..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                    {content.cta.form.phone}
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-600 transition-colors"
                    placeholder="..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                    {content.cta.form.case_type.label}
                  </label>
                  <select 
                    required
                    value={formData.case_type}
                    onChange={(e) => setFormData({ ...formData, case_type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-600 transition-colors text-white appearance-none cursor-pointer"
                  >
                    <option value="general" className="bg-black">{content.cta.form.case_type.options.general}</option>
                    <option value="urgent" className="bg-black">{content.cta.form.case_type.options.urgent}</option>
                    <option value="business" className="bg-black">{content.cta.form.case_type.options.business}</option>
                    <option value="real_estate" className="bg-black">{content.cta.form.case_type.options.real_estate}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                    {content.cta.form.message}
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-600 transition-colors"
                    placeholder="..."
                  />
                </div>
                
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm">
                    {content.cta.form.success}
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {content.cta.form.error}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 bg-accent-600 text-white font-black text-lg rounded-xl hover:bg-accent-500 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? '...' : content.cta.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Hanoi Office */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-500" />
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">Head Office (Hanoi)</h4>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                TM1-4 Toà 903, Chung cư Starlake, Khu đô thị Tây Hồ Tây, Phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Hà Nội, Việt Nam
              </p>
            </div>

            {/* Ho Chi Minh Office */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Branch (Ho Chi Minh)</h4>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Block A, tầng 3, tòa nhà Indochina Park Tower, 04 Nguyễn Đình Chiểu, phường Đakao, Quận 1, TP. Hồ Chí Minh, Việt Nam
              </p>
            </div>

            {/* Hai Phong Office */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Branch (Hai Phong)</h4>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                ND 20-1, Khu Z1, KDT Doi, P. Van Huong, Q. Do Son, Tp. Hai Phong, Việt Nam
              </p>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
              <Scale className="w-8 h-8 text-accent-500" />
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-transparent bg-clip-text bg-gradient-to-b from-accent-200 to-accent-600">VNK HANOI</span>
                <span className="text-[8px] uppercase tracking-widest text-accent-500/40">Linda Kang Law Office</span>
                <span className="text-[8px] uppercase tracking-wider text-accent-400 font-black mt-1">{content.centerName}</span>
              </div>
            </div>
            <p className="text-white/20 text-[10px] tracking-widest uppercase">
              © 2026 VNK HANOI. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-white/40 text-[10px] uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-accent-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent-600 transition-colors">Terms of Service</a>
            </div>
          </div>

          {/* SEO Footer */}
          <div className="mt-20 pt-8 border-t border-white/5">
            <p className="text-[10px] text-white/10 leading-relaxed text-center max-w-4xl mx-auto">
              {content.seo}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
