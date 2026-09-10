import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getLevelInfo,
  getSupportLevel,
  markTextCompleted,
} from "./supportLevel"

const poem = {
  id: "nguyet-cam",
  title: "Nguyệt Cầm",
  author: "Xuân Diệu",
  source:
    "In trong Gửi hương cho gió, NXB Hội Nhà văn, Hội Nghiên cứu – Giảng dạy văn học, Thành phố Hồ Chí Minh, 1992, tr. 77",
}

const poemStanzas = [
  [
    "Trăng nhập vào đây cung nguyệt lạnh,",
    "Trăng thương, trăng nhớ, hỡi trăng ngàn.",
    "Đàn buồn, đàn lặng, ôi đàn chậm!",
    "Mỗi giọt rơi tàn như lệ ngân.",
  ],
  [
    "Mây vắng, trời trong, đêm thủy tinh;",
    "Linh lung bóng sáng bỗng rung mình",
    "Vì nghe nương tử trong câu hát",
    "Đã chết đêm rằm theo nước xanh.",
  ],
  [
    "Thu lạnh càng thêm nguyệt tỏ ngời,",
    "Đàn ghê như nước, lạnh, trời ơi...",
    "Long lanh tiếng sỏi vang vang hận.",
    "Trăng nhớ Tầm Dương, nhạc nhớ người.",
  ],
  [
    "Bốn bề ánh nhạc: biển pha lê",
    "Chiếc đảo hồn tôi rợn bốn bề.",
    "Sương bạc làm thinh, khuya nín thở",
    "Nghe sầu âm nhạc đến sao Khuê.",
  ],
]

const activities = [
  {
    id: 1,
    title: "Tìm hiểu đặc sắc từ ngữ, hình ảnh qua sự tương giao cảm giác",
    shortTitle: "Tương giao cảm giác",
  },
  {
    id: 2,
    title: "Tìm hiểu yếu tố tượng trưng",
    shortTitle: "Yếu tố tượng trưng",
  },
  {
    id: 3,
    title: "Tìm hiểu nhạc điệu",
    shortTitle: "Nhạc điệu",
  },
  {
    id: 4,
    title: "Tìm hiểu tình cảm, cảm xúc của chủ thể trữ tình",
    shortTitle: "Cảm xúc",
  },
  {
    id: 5,
    title: "Tìm hiểu về cấu tứ",
    shortTitle: "Cấu tứ",
  },
]

const sensoryTargets = [
  "… giọt rơi tàn như lệ ngân",
  "… bóng sáng bỗng rung mình",
  "Long lanh tiếng sỏi…",
  "… ánh nhạc: biển pha lê …",
]

const highlightedLines = [
  "Trăng nhập vào đây cung nguyệt lạnh",
  "Trăng thương / trăng nhớ / hỡi trăng ngàn",
  "Đàn buồn / đàn lặng / ôi đàn chậm!",
  "Mỗi giọt rơi tàn / như lệ ngân",
  "Long lanh tiếng sỏi…",
  "… ánh nhạc: biển pha lê …",
]

/*
 * Nội dung nhiệm vụ được giữ theo tài liệu NGUYỆT CẦM(1).pdf.
 * Mỗi mức có số lượng/mức độ dẫn dắt khác nhau để phân biệt
 * Mức 1 – hỗ trợ cao, Mức 2 – hỗ trợ vừa, Mức 3 – hỗ trợ thấp.
 */
const activityPrompts = {
  1: {
    1: [
      "Đọc lại văn bản và tìm những từ ngữ, hình ảnh gợi tả ánh sáng, màu sắc, đường nét mà em có thể cảm nhận bằng mắt; đồng thời tìm những từ ngữ, hình ảnh gợi âm thanh, tiếng đàn, nhạc điệu mà em có thể cảm nhận bằng tai.",
      "Sự hòa quyện giữa ánh sáng và âm thanh đã làm cho những âm thanh, hình ảnh trong bài thơ trở nên như thế nào? Không gian đêm trăng vì thế được cảm nhận theo cách khác với cách miêu tả thông thường ra sao?",
      "Từ đó, em cảm nhận như thế nào về thế giới nghệ thuật và tâm trạng của chủ thể trữ tình?",
      "Từ mối quan hệ giữa “Nguyệt” và “Cầm”, kết hợp với những gì em vừa khám phá về sự tương giao giác quan, em hãy giải thích ý nghĩa của nhan đề Nguyệt Cầm. Theo em, nhan đề chỉ gọi tên một loại đàn hay còn gợi ra một thế giới nghệ thuật và tâm trạng nào?",
    ],
    2: [
      "Đọc lại bài thơ và xác định những hình ảnh trong đó cảm giác về ánh sáng/trăng và âm thanh/âm nhạc được kết hợp với nhau. Ghi lại hình ảnh và khổ thơ tương ứng.",
      "Với những hình ảnh đã xác định, hãy phân tích sự tương giao giác quan được thể hiện trong từng trường hợp.",
      "Từ cách nhà thơ tổ chức và kết hợp các cảm giác trong những hình ảnh trên, em hãy nhận xét về hiệu quả biểu đạt của thủ pháp tương giao giác quan đối với thế giới nghệ thuật và cảm xúc được thể hiện trong bài thơ.",
      "Từ những khám phá về ánh sáng/trăng và âm nhạc/âm thanh trong bài thơ, em hãy lí giải ý nghĩa nhan đề Nguyệt Cầm.",
    ],
    3: [
      "Xác định những từ ngữ, hình ảnh trong bài thơ được diễn tả bằng sự kết hợp hoặc chuyển đổi giữa các giác quan. Ghi lại các trường hợp tiêu biểu và cho biết chúng xuất hiện ở khổ thơ nào.",
      "Với những hình ảnh đã xác định, hãy phân tích sự tương giao giác quan được thể hiện trong từng trường hợp. Trình bày ngắn gọn sự kết hợp giữa các cảm giác và cách sự kết hợp đó được thể hiện qua từ ngữ, hình ảnh của câu thơ.",
      "Hãy phân tích ý nghĩa và tác dụng nghệ thuật của sự kết hợp giữa các cảm giác được thể hiện trong bài thơ.",
      "Sau khi đọc và phân tích bài thơ, hãy cho biết ý nghĩa nhan đề Nguyệt Cầm như thế nào và lí giải cách hiểu của em bằng những phát hiện từ văn bản.",
    ],
  },
  2: {
    1: [
      "Đọc lại bài thơ và tìm những từ ngữ, hình ảnh được nhà thơ sử dụng nổi bật hoặc có cách diễn đạt đặc biệt, gây cho em ấn tượng. Hãy đánh dấu những từ ngữ, hình ảnh ngoài ý nghĩa trực tiếp còn có thể gợi ra những liên tưởng hoặc ý nghĩa khác.",
      "Hãy dựa vào chú thích và những từ ngữ, hình ảnh xung quanh để xác định hình ảnh gợi cho em những liên tưởng, ý niệm gì; từ đó lí giải ý nghĩa tượng trưng của hình ảnh trong Nguyệt Cầm.",
      "Từ những hình ảnh đã phân tích, hãy khái quát những ý nghĩa tượng trưng nổi bật được gợi ra trong bài thơ. Xem xét mối liên hệ giữa các hình ảnh, hãy làm rõ sự kết hợp của chúng góp phần thể hiện thế giới nghệ thuật, cảm xúc, tâm trạng hoặc những suy ngẫm nào của chủ thể trữ tình trong Nguyệt Cầm.",
    ],
    2: [
      "Đọc lại bài thơ và tìm những từ ngữ, hình ảnh được nhà thơ sử dụng nổi bật hoặc có cách diễn đạt đặc biệt, ngoài ý nghĩa trực tiếp còn có thể gợi ra những liên tưởng hoặc ý nghĩa khác.",
      "Với hình ảnh người phụ nữ ở khổ 2, bến Tầm Dương ở khổ 3 và sao Khuê ở khổ 4, hãy làm rõ nghĩa thực, những liên tưởng được gợi ra và ý nghĩa tượng trưng.",
      "Các hình ảnh có mối quan hệ như thế nào và sự kết hợp của chúng góp phần thể hiện cảm xúc, tâm trạng hoặc tư tưởng gì của chủ thể trữ tình?",
    ],
    3: [
      "Xác định những hình ảnh trong bài thơ có khả năng gợi mở lớp nghĩa liên tưởng bên cạnh ý nghĩa trực tiếp và ghi lại vị trí của chúng trong văn bản.",
      "Phân tích lớp nghĩa tượng trưng của những hình ảnh đã xác định bằng cách làm rõ mối quan hệ giữa ý nghĩa trực tiếp, các liên tưởng được gợi ra và ý nghĩa của hình ảnh trong chỉnh thể bài thơ.",
      "Từ ý nghĩa của các hình ảnh đã phân tích, hãy khái quát ý nghĩa của hệ thống hình ảnh tượng trưng trong Nguyệt Cầm.",
    ],
  },
  3: {
    1: [
      "Theo dõi hướng dẫn dưới đây để xác định cách ngắt nhịp và phối hợp thanh điệu trong bài thơ.",
      "Xác định cách ngắt nhịp, phối hợp thanh điệu ở bốn khổ thơ và đưa ra khái quát chung về cách ngắt nhịp và phối hợp thanh điệu của bài thơ.",
      "Từ những đặc điểm về cách ngắt nhịp, phối hợp thanh điệu và sự liên tưởng đến tiếng đàn, hãy khái quát vai trò của nhạc điệu trong việc tạo nên âm hưởng và thể hiện cảm xúc của bài thơ Nguyệt Cầm.",
    ],
    2: [
      "Đọc lại bài thơ và xác định cách ngắt nhịp, sự phối hợp thanh điệu trong các câu thơ. Từ những đặc điểm đã xác định, hãy khái quát chung về nhịp điệu và thanh điệu của bài thơ.",
      "Cách ngắt nhịp và phối hợp thanh điệu trong bài thơ đã giúp em hình dung như thế nào về tiếng đàn nguyệt trong đêm lạnh? Hãy dựa vào những đặc điểm về nhịp điệu và thanh điệu vừa xác định để lí giải liên tưởng của em.",
      "Từ những đặc điểm về cách ngắt nhịp, phối hợp thanh điệu và liên tưởng về tiếng đàn nguyệt, hãy khái quát vai trò của nhạc điệu trong việc tạo nên âm hưởng và thể hiện cảm xúc của bài thơ Nguyệt Cầm.",
    ],
    3: [
      "Đọc lại Nguyệt Cầm và tự xác định cách ngắt nhịp, sự phối hợp thanh điệu trong bài thơ. Từ những đặc điểm nhận biết được, hãy khái quát đặc điểm chung về nhịp điệu và thanh điệu của bài thơ.",
      "Từ những đặc điểm về cách ngắt nhịp và phối hợp thanh điệu đã xác định, hãy trình bày những liên tưởng của em về tiếng đàn nguyệt trong đêm lạnh.",
      "Hãy khái quát vai trò của nhạc điệu trong Nguyệt Cầm. Làm rõ nhạc điệu đã góp phần tạo nên âm hưởng, không gian nghệ thuật và thể hiện cảm xúc của bài thơ như thế nào.",
    ],
  },
  4: {
    1: [
      "Xác định chủ thể trữ tình của bài thơ. Cho biết các cảm giác “lạnh”, “rung mình”, “ghê như nước”, “rợn” là cảm giác của ai? Những cảm giác này được gợi ra từ đâu trong bài thơ?",
      "Chủ thể trữ tình trong bài thơ đã thể hiện cảm xúc gì khi lắng nghe tiếng đàn. Các chi tiết nào trong bài thơ cho thấy điều đó?",
      "Từ những cảm xúc được thể hiện và sự vận động của chúng trong bài thơ, chủ thể trữ tình bộc lộ những tình cảm, thái độ gì? Hãy khái quát tình cảm, thái độ chủ đạo được thể hiện trong bài thơ.",
    ],
    2: [
      "Đọc lại bài thơ và xác định chủ thể trữ tình. Từ những cảm giác, trạng thái được biểu hiện trong văn bản, hãy xác định đối tượng và hoàn cảnh làm nảy sinh cảm xúc của chủ thể trữ tình.",
      "Theo dõi diễn biến của mạch thơ và đối chiếu các khổ thơ để xác định sự thay đổi trong cảm xúc của chủ thể trữ tình khi cảm nhận tiếng đàn. Những thay đổi đó được thể hiện qua những chi tiết nào?",
      "Từ sự vận động của cảm xúc, hãy khái quát tình cảm, thái độ của chủ thể trữ tình đối với đối tượng được hướng tới và những nét nổi bật trong đời sống nội tâm của chủ thể trữ tình.",
    ],
    3: [
      "Đọc lại bài thơ và xác định cảm giác, trạng thái cảm xúc của chủ thể trữ tình trong từng khổ thơ. Dựa vào các từ ngữ, hình ảnh, chi tiết trong văn bản để lí giải.",
      "Từ những cảm giác, trạng thái cảm xúc được thể hiện qua từng khổ thơ, hãy khái quát cảm xúc chủ đạo của chủ thể trữ tình trong bài thơ. Làm rõ những sắc thái nổi bật của cảm xúc ấy và mối quan hệ của chúng với đối tượng được hướng tới.",
      "Có ý kiến cho rằng: “Trong Nguyệt Cầm, tiếng đàn không chỉ được nghe bằng đôi tai mà còn được cảm nhận bằng toàn bộ tâm hồn.” Em có đồng tình với ý kiến trên không? Hãy viết đoạn văn để trình bày ý kiến.",
    ],
  },
  5: {
    1: [
      "Tứ thơ là ý tưởng, cảm hứng hoặc cách nhìn trung tâm được nhà thơ triển khai xuyên suốt bài thơ. Hãy dựa vào những hình tượng nổi bật, đối tượng được tập trung thể hiện và cảm xúc của chủ thể trữ tình để khái quát tứ thơ của Nguyệt Cầm.",
      "Xác định những hình tượng nổi bật trong từng khổ thơ và theo dõi sự xuất hiện của chúng. Xem xét các hình tượng có quan hệ tương ứng, song đôi, tương phản, nối tiếp hoặc bổ sung cho nhau hay không.",
      "Từ mối quan hệ giữa hình tượng và cảm xúc, hãy xác định cách nhà thơ tổ chức bài thơ: theo không gian, thời gian, sự vận động của cảm xúc, tương phản, sóng đôi, đầu – cuối tương ứng...",
    ],
    2: [
      "Đọc bao quát Nguyệt Cầm và khái quát tứ thơ của bài. Xác định ý tưởng, cảm hứng hoặc cách nhìn trung tâm được triển khai xuyên suốt bài thơ.",
      "Từ việc xác định cảm xúc của chủ thể trữ tình, em hãy nhận xét cách thức triển khai mạch cảm xúc trong bài thơ. Trong bài thơ, những hình ảnh nào đồng thời gợi ánh trăng và tiếng đàn? Từ đó, em nhận xét mối quan hệ giữa hình tượng trăng và đàn?",
      "Từ những phân tích trên, hãy khái quát chủ đề, tư tưởng của văn bản Nguyệt Cầm. Làm rõ cách tổ chức hệ thống hình tượng và mạch cảm xúc góp phần triển khai tứ thơ, đồng thời thể hiện tâm trạng, tình cảm của chủ thể trữ tình và tư tưởng chủ đề của bài thơ như thế nào.",
    ],
    3: [
      "Dựa vào những kết quả đọc hiểu đã thực hiện, hãy phân tích cách tứ thơ Nguyệt Cầm được triển khai từ đầu đến cuối bài thơ.",
      "Cách tổ chức các hình tượng và mạch cảm xúc của bài thơ có tác dụng gì trong việc triển khai tứ thơ và thể hiện thế giới nội tâm của chủ thể trữ tình? Nếu thay đổi cách tổ chức ấy, sức gợi của bài thơ sẽ thay đổi như thế nào?",
      "Vì sao Xuân Diệu không chỉ tập trung miêu tả tiếng đàn mà lại để tiếng đàn hòa quyện với trăng, nước, ánh sáng, sương, không gian và những liên tưởng văn hóa? Cách tổ chức ấy có vai trò như thế nào trong việc phát triển tứ thơ và tạo nên chiều sâu cảm xúc của Nguyệt Cầm? Từ câu trả lời trong các nhiệm vụ trên hãy cho biết Nguyệt Cầm có chủ đề, tư tưởng gì?",
    ],
  },
}

/*
 * Các bảng trong tài liệu.
 * type = table để giao diện hiển thị đúng cấu trúc bảng.
 */
const activityTables = {
  "1-1": [
    {
      title: "Bước 1 – Nhận diện các hình ảnh có sự tương giao giác quan",
      headers: ["Nhóm cảm giác", "Từ ngữ / hình ảnh"],
      rows: [
        ["Gợi ánh sáng – thị giác", "trăng ngần – bóng sáng – long lanh – ánh nhạc – biển pha lê"],
        ["Gợi âm thanh – thính giác", "tiếng – đàn – ngân – nhạc – vang vang"],
      ],
      note:
        "Hãy chú ý đến hai mạch hình ảnh xuất hiện nổi bật trong bài thơ: ánh sáng/trăng và âm nhạc/đàn. Sau đó, hãy đánh dấu những trường hợp hai nhóm cảm giác xuất hiện và hòa quyện trong cùng một hình ảnh/cách diễn đạt.",
    },
    {
      title: "Bước 2 – Phân tích từ ngữ, hình ảnh có sự tương giao giữa các giác quan",
      headers: ["Khổ thơ", "Hình ảnh", "Hình ảnh gợi ánh sáng – trăng (Thị giác)", "Hình ảnh gợi ra âm nhạc – đàn (Thính giác)"],
      rows: [
        ["1", "… giọt rơi tàn như lệ ngân", "Gợi hình ảnh, ánh sáng, màu sắc, đường nét…", "Gợi tiếng động, âm thanh, nhạc điệu, độ vang…"],
        ["2", "… bóng sáng bỗng rung mình", "", ""],
        ["3", "Long lanh tiếng sỏi…", "", ""],
        ["4", "… ánh nhạc: biển pha lê …", "", ""],
      ],
    },
  ],
  "1-2": [
    {
      title: "Bước 1 – Nhận diện hình ảnh có sự tương giao giác quan",
      headers: ["Khổ thơ", "Hình ảnh có sự tương giao giác quan"],
      rows: [
        ["1", "… giọt rơi tàn như lệ ngân"],
        ["2", "… bóng sáng bỗng rung mình"],
        ["3", "Long lanh tiếng sỏi…"],
        ["4", "… ánh nhạc: biển pha lê …"],
      ],
      note:
        "Hình ảnh có sự tương giao giác quan là hình ảnh được cảm nhận từ hai hay nhiều giác quan khác nhau (ví dụ: thị giác với thính giác).",
    },
    {
      title: "Bước 2 – Phân tích từ ngữ, hình ảnh có sự tương giao giữa các giác quan",
      headers: ["Khổ thơ", "Hình ảnh", "Hình ảnh gợi ra ánh sáng – trăng (Thị giác)", "Hình ảnh gợi ra âm nhạc – đàn (Thính giác)"],
      rows: [
        ["1", "… giọt rơi tàn như lệ ngân", "", ""],
        ["2", "… bóng sáng bỗng rung mình", "", ""],
        ["3", "Long lanh tiếng sỏi…", "", ""],
        ["4", "… ánh nhạc: biển pha lê …", "", ""],
      ],
    },
  ],
  "2-1": [
    {
      title: "Bước 2 – Khám phá lớp nghĩa liên tưởng",
      headers: ["Hình ảnh", "Chú thích, hướng dẫn", "Gợi ra ý nghĩa"],
      rows: [
        [
          "Hình ảnh người phụ nữ ở khổ thơ 2",
          "Nương tử: (từ cổ) dùng để gọi người phụ nữ trẻ một cách tôn trọng.",
          "",
        ],
        [
          "Hình ảnh bến Tầm Dương ở khổ thơ 3",
          "Bến Tầm Dương canh khuya đưa khách, Quạnh hơi thu, lau lách đìu hiu. (Tì bà hành - Bạch Cư Dị). Người phụ nữ chơi đàn tì bà trên bến sông Tầm Dương, thời trẻ dập dìu kẻ đưa người đón nhưng về sau bị lãng quên, sống cô độc bên bến sông.",
          "",
        ],
        [
          "Hình ảnh sao Khuê ở khổ thơ 4",
          "Sao Khuê: tên một chòm sao trong thiên văn Trung Quốc thời cổ đại. Trong văn hoá Đông Á, sao Khuê được coi là biểu tượng của văn chương, nghệ thuật.",
          "",
        ],
      ],
    },
  ],
  "2-2": [
    {
      title: "Bước 2 – Khám phá lớp nghĩa liên tưởng và ý nghĩa tượng trưng",
      headers: ["Hình ảnh", "Nghĩa thực và những liên tưởng được gợi ra", "Ý nghĩa tượng trưng"],
      rows: [
        ["Hình ảnh người phụ nữ ở khổ thơ 2", "", ""],
        ["Hình ảnh bến Tầm Dương ở khổ thơ 3", "", ""],
        ["Hình ảnh sao Khuê ở khổ thơ 4", "", ""],
      ],
    },
  ],
  "3-1": [
    {
      title: "Bước 1 – Theo dõi hướng dẫn xác định nhịp và thanh điệu",
      headers: ["Cách thực hiện", "Gợi ý hỗ trợ"],
      rows: [
        [
          "1. Xác định cách ngắt nhịp: Quan sát các dấu câu và những điểm ngắt nghĩa tự nhiên trong câu thơ. Đọc câu thơ thành tiếng và đánh dấu / tại những vị trí ngắt nhịp phù hợp.",
          "Chú ý đến các dấu câu và sự phân chia thành những cụm từ có nghĩa.",
        ],
        [
          "2. Xác định thanh điệu: Quan sát sự phối hợp giữa thanh bằng và thanh trắc trong các câu thơ.",
          "- Thanh bằng: ngang, huyền.\n- Thanh trắc: sắc, hỏi, ngã, nặng.",
        ],
        [
          "3. Khái quát: Từ những đặc điểm vừa xác định, hãy nhận xét chung về cách ngắt nhịp và phối hợp thanh điệu trong bài thơ.",
          "Có thể xem xét nhịp thơ có đều đặn hay biến đổi? Thanh bằng/trắc được phối hợp như thế nào?\n\nHướng dẫn: nhịp 2/2/3 đều đặn thường tạo cảm giác chậm rãi, trầm lắng; nhịp lẻ, ngắt bất thường thường tạo cảm giác gấp gáp, xao động.",
        ],
      ],
      note:
        "Ví dụ: Trăng nhập vào dây cung/ nguyệt lạnh; Trăng thương/ trăng nhớ /hỡi trăng ngần; Đàn buồn/ đàn lặng /ôi đàn chậm!; Mỗi giọt rơi tàn /như lệ ngân.",
    },
  ],
  "4-1": [
    {
      title: "Bước 1 – Xác định chủ thể trữ tình và trạng thái cảm xúc",
      headers: ["Cảm giác", "Xuất phát từ…"],
      rows: [
        ["“lạnh” (khổ 1)", ""],
        ["“rùng mình” (khổ 2)", ""],
        ["“ghê như nước” (khổ 3)", ""],
        ["“rợn” (khổ 4)", ""],
      ],
      note:
        "“Chủ thể trữ tình là khái niệm chỉ người thể hiện thái độ, cảm xúc, tư tưởng của mình trong suốt văn bản thơ. Chủ thể trữ tình thường xuất hiện trực tiếp với các đại từ nhân xưng: \"tôi\", \"ta\", \"chúng ta\", \"anh\", \"em\",… hoặc nhập vai vào một nhân vật nào đó, cũng có thể là \"chủ thể ẩn\". Các hình thức xuất hiện trên của chủ thể trữ tình cũng có thể thay đổi, xen kẽ trong một bài thơ.” (SGK 10, CTST, tập 1, tr.63)",
    },
    {
      title: "Bước 2 – Theo dõi sự vận động của cảm xúc",
      headers: ["Khổ thơ", "Các chi tiết thể hiện cảm xúc của chủ thể trữ tình", "Cảm xúc của chủ thể trữ tình"],
      rows: [
        ["1", "", ""],
        ["2 và 3", "", ""],
        ["4", "", ""],
      ],
    },
  ],
  "4-2": [
    {
      title: "Bước 1 – Xác định chủ thể trữ tình và trạng thái cảm xúc",
      headers: ["Chủ thể trữ tình", "Đối tượng hướng tới và hoàn cảnh nảy sinh cảm xúc", "Những trạng thái cảm xúc được biểu hiện"],
      rows: [["", "", ""]],
    },
    {
      title: "Bước 2 – Theo dõi sự vận động của cảm xúc",
      headers: ["Khổ thơ", "Cảm xúc của chủ thể trữ tình"],
      rows: [
        ["1", ""],
        ["2 và 3", ""],
        ["4", ""],
      ],
    },
  ],
  "4-3": [
    {
      title: "Bước 1 – Xác định cảm giác, trạng thái cảm xúc của chủ thể trữ tình",
      headers: ["Khổ thơ", "Cảm giác, trạng thái cảm xúc của chủ thể trữ tình"],
      rows: [
        ["1", ""],
        ["2", ""],
        ["3", ""],
        ["4", ""],
      ],
    },
  ],
}

const hintData = {
  "1-1": [
    "Gợi ý: Hãy chú ý đến hai mạch hình ảnh xuất hiện nổi bật trong bài thơ: ánh sáng/trăng và âm nhạc/đàn. Sau đó, hãy đánh dấu những trường hợp hai nhóm cảm giác xuất hiện và hòa quyện trong cùng một hình ảnh/cách diễn đạt.",
  ],
  "1-2": [
    "Gợi ý: Hình ảnh có sự tương giao giác quan là hình ảnh được cảm nhận từ hai hay nhiều giác quan khác nhau (ví dụ: thị giác với thính giác).",
    "Gợi ý: Hãy trở lại những hình ảnh đã phân tích ở bước 2 và thử hình dung: khi các giác quan không còn hoạt động tách biệt, thế giới trong bài thơ được cảm nhận theo cách nào? Cách cảm nhận ấy giúp người đọc cảm nhận sâu hơn điều gì được gửi gắm qua bài thơ?",
    "Gợi ý: Hãy thử đặt hai thành tố “Nguyệt” và “Cầm” bên cạnh những hình ảnh nổi bật mà em vừa khám phá. Từ sự liên hệ đó, em có thể nhận ra điều gì về cách nhà thơ tổ chức thế giới nghệ thuật và cảm xúc trong bài thơ?",
  ],
  "1-3": [
    "Gợi ý: Khi lí giải, cần đặt hình ảnh trong ngữ cảnh của bài thơ và chú ý đến những liên hệ văn hóa, văn học mà hình ảnh có thể gợi ra.",
  ],
  "2-1": [
    "Gợi ý: Chú ý đến những hình ảnh gắn với trăng, tiếng đàn, âm thanh, ánh sáng, sỏi, pha lê, lệ, người phụ nữ, bến Tầm Dương, sao Khuê…; đặc biệt lưu ý những hình ảnh có cách kết hợp từ ngữ khác với cách miêu tả thông thường hoặc có sự liên hệ với những hình ảnh, tác phẩm, tri thức văn hóa khác.",
    "Gợi ý: Hãy chú ý đến mối quan hệ giữa các hình ảnh và những liên tưởng được tạo nên khi chúng xuất hiện trong cùng một chỉnh thể.",
  ],
  "2-2": [
    "Gợi ý: Hãy chú ý đến những hình ảnh được đặt trong mối quan hệ đặc biệt với các từ ngữ xung quanh hoặc với những hình ảnh khác trong bài thơ.",
    "Gợi ý: Khi lí giải, cần đặt hình ảnh trong ngữ cảnh của bài thơ và chú ý đến những liên hệ văn hóa, văn học mà hình ảnh có thể gợi ra.",
  ],
  "3-1": [
    "Gợi ý: Khi đọc theo nhịp điệu ấy, em cảm nhận tiếng đàn êm dịu hay đứt quãng, ngân dài hay ngắt nghẹn, nhẹ nhàng hay réo rắt? Những âm hưởng ấy gợi cho em cảm giác gì về tiếng đàn trong không gian đêm lạnh?",
    "Gợi ý: Cách ngắt nhịp và phối hợp thanh điệu tạo nên nhịp điệu, âm hưởng như thế nào cho bài thơ? Nhạc điệu có sự biến đổi ra sao và sự biến đổi ấy tương ứng với những sắc thái cảm xúc nào của chủ thể trữ tình?",
  ],
  "3-2": [
    "Gợi ý: Em có thể chú ý đến vị trí các dấu câu, những điểm ngắt nghĩa tự nhiên và sự phối hợp giữa thanh bằng (ngang, huyền) và thanh trắc (sắc, hỏi, ngã, nặng).",
    "Gợi ý: Khi đọc theo nhịp điệu của bài thơ, em cảm nhận tiếng đàn như thế nào: êm dịu, ngân dài, chậm rãi, đứt quãng, nghẹn ngào hay réo rắt? Những đặc điểm ấy gợi cho em cảm giác gì về tiếng đàn?",
  ],
  "4-1": [
    "Gợi ý: Dựa vào những trạng thái cảm xúc và sự vận động của chúng đã xác định ở Bước 2 để đi đến nhận xét khái quát.",
  ],
  "4-2": [
    "Gợi ý: Theo dõi diễn biến của mạch thơ và đối chiếu các khổ thơ để xác định sự thay đổi trong cảm xúc của chủ thể trữ tình khi cảm nhận tiếng đàn.",
  ],
  "5-1": [
    "Gợi ý: Tứ thơ không chỉ là kể lại nội dung bài thơ mà cần thể hiện cách nhà thơ cảm nhận và triển khai đối tượng.",
    "Gợi ý: Theo dõi sự vận động của các hình tượng và mạch cảm xúc từ đầu đến cuối bài thơ. Chỉ ra cách các hình tượng được sắp xếp, liên kết với nhau và sự thay đổi, phát triển của cảm xúc trong quá trình triển khai tứ thơ.",
    "Gợi ý: Mạch cảm xúc được dẫn dắt như thế nào nhờ cách tổ chức ấy? Nếu thay đổi cách sắp xếp hình tượng hoặc trình tự cảm xúc, hiệu quả biểu đạt của bài thơ có thay đổi không? Qua đó, cấu tứ góp phần thể hiện tâm trạng, tình cảm và tư tưởng gì?",
  ],
  "5-2": [
    "Gợi ý: Hãy chú ý đến đối tượng trung tâm, những hình tượng nổi bật và sự vận động của cảm xúc để xác định ý tưởng bao trùm bài thơ.",
    "Gợi ý: Làm rõ cách tổ chức hệ thống hình tượng và mạch cảm xúc góp phần triển khai tứ thơ, đồng thời thể hiện tâm trạng, tình cảm của chủ thể trữ tình và tư tưởng chủ đề của bài thơ như thế nào.",
  ],
}

function QuestionTable({ table }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-[#dfd4c7] bg-white">
      <div className="min-w-[620px]">
        <div className="border-b border-[#dfd4c7] bg-[#fff8ee] px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-[#7f1d2d]">
            {table.title}
          </p>
        </div>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {table.headers.map((header) => (
                <th
                  key={header}
                  className="border-b border-r border-[#dfd4c7] px-3 py-3 text-left font-bold text-gray-700 last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="align-top">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${rowIndex}-${cellIndex}`}
                    className="whitespace-pre-line border-b border-r border-[#e6ddd4] px-3 py-3 leading-6 text-gray-700 last:border-r-0"
                  >
                    {cell || " "}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {table.note && (
          <div className="border-t border-[#dfd4c7] bg-[#fffdf9] px-4 py-3 text-xs leading-5 text-gray-600">
            {table.note}
          </div>
        )}
      </div>
    </div>
  )
}

function HintBox({ hint, hintKey, revealed, onReveal }) {
  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-[#ead7b2] bg-[#fffaf0]">
      <button
        type="button"
        onClick={() => onReveal(hintKey)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="text-sm font-bold text-[#8a5a00]">
          💡 Gợi ý
        </span>

        <span className="text-xs font-semibold text-[#8a5a00]">
          {revealed ? "Đã mở" : "Nhấn để xem"}
        </span>
      </button>

      {revealed && (
        <div className="border-t border-[#ead7b2] px-4 py-3 text-sm leading-6 text-gray-700">
          {hint}
        </div>
      )}
    </div>
  )
}

export default function LearningWorkspace() {
  const navigate = useNavigate()

  const supportLevel = getSupportLevel()
  const supportInfo = getLevelInfo(supportLevel)

  const [activeActivity, setActiveActivity] = useState(1)
  const [completedActivities, setCompletedActivities] = useState([])
  const [answers, setAnswers] = useState({})
  const [selectedTargets, setSelectedTargets] = useState([])
  const [note, setNote] = useState("")
  const [showNoteBox, setShowNoteBox] = useState(false)
  const [revealedHints, setRevealedHints] = useState({})
  const [hintUsage, setHintUsage] = useState({})

  useEffect(() => {
    localStorage.setItem(
      "nguyetCamLearningAnswers",
      JSON.stringify(answers),
    )
  }, [answers])

  useEffect(() => {
    localStorage.setItem(
      "nguyetCamHintUsage",
      JSON.stringify(hintUsage),
    )
  }, [hintUsage])

  const currentActivity =
    activities.find((item) => item.id === activeActivity) ||
    activities[0]

  const progress = useMemo(
    () =>
      Math.round(
        (completedActivities.length / activities.length) * 100,
      ),
    [completedActivities.length],
  )

  const updateAnswer = (activityId, stepIndex, value) => {
    setAnswers((current) => ({
      ...current,
      [`${activityId}-${supportLevel}-${stepIndex}`]: value,
    }))
  }

  const getAnswer = (activityId, stepIndex) =>
    answers[`${activityId}-${supportLevel}-${stepIndex}`] || ""

  const toggleTarget = (target) => {
    setSelectedTargets((current) =>
      current.includes(target)
        ? current.filter((item) => item !== target)
        : [...current, target],
    )
  }

  const revealHint = (hintKey) => {
    if (revealedHints[hintKey]) return

    setRevealedHints((current) => ({
      ...current,
      [hintKey]: true,
    }))

    setHintUsage((current) => ({
      ...current,
      [hintKey]: (current[hintKey] || 0) + 1,
    }))
  }

  const totalHintUses = Object.values(hintUsage).reduce(
    (sum, count) => sum + count,
    0,
  )

  const getActivityHintCount = (activityId) =>
    Object.entries(hintUsage).reduce((sum, [key, count]) => {
      return key.startsWith(`${activityId}-${supportLevel}-`)
        ? sum + count
        : sum
    }, 0)

  const handleCompleteActivity = () => {
    if (activeActivity === 1 && selectedTargets.length === 0) {
      alert(
        "Hãy chọn ít nhất một hình ảnh/từ ngữ để bắt đầu phân tích.",
      )
      return
    }

    const prompts =
      activityPrompts[activeActivity]?.[supportLevel] || []

    const hasAnswer = prompts.some((_, index) =>
      getAnswer(activeActivity, index).trim(),
    )

    if (!hasAnswer) {
      alert(
        "Hãy hoàn thành ít nhất một phần trả lời trước khi tiếp tục.",
      )
      return
    }

    setCompletedActivities((current) =>
      current.includes(activeActivity)
        ? current
        : [...current, activeActivity],
    )

    if (activeActivity < activities.length) {
      setActiveActivity(activeActivity + 1)
      setSelectedTargets([])

      setTimeout(() => {
        document
          .getElementById(`activity-${activeActivity + 1}`)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
      }, 100)
    }
  }

  const handleActivityChange = (activityId) => {
    if (
      activityId > 1 &&
      !completedActivities.includes(activityId - 1)
    ) {
      return
    }

    setActiveActivity(activityId)
    setSelectedTargets([])

    setTimeout(() => {
      document
        .getElementById(`activity-${activityId}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
    }, 100)
  }

  const handleFinish = () => {
    const durationSeconds = Math.max(
      0,
      Math.round(
        (Date.now() -
          Number(
            localStorage.getItem("learningStartedAt") ||
              Date.now(),
          )) /
          1000,
      ),
    )

    markTextCompleted(poem.id, durationSeconds)

    const summary = {
      textId: poem.id,
      title: poem.title,
      supportLevel,
      completedActivities,
      answers,
      selectedTargets,
      note,
      hintUsage,
      totalHintUses,
      hintUsageByActivity: activities.reduce((result, activity) => {
        result[activity.id] = getActivityHintCount(activity.id)
        return result
      }, {}),
      completedAt: new Date().toISOString(),
      durationSeconds,
    }

    localStorage.setItem(
      "nguyetCamLearningSummary",
      JSON.stringify(summary),
    )

    /*
     * Cập nhật hồ sơ học tập.
     * Giữ dữ liệu cũ nếu hồ sơ đã tồn tại, chỉ bổ sung dữ liệu
     * của văn bản Nguyệt Cầm.
     */
    const existingProfile = JSON.parse(
      localStorage.getItem("studentLearningProfile") || "{}",
    )

    const previousHintUses = Number(
      existingProfile.totalHintUses || 0,
    )

    const previousTexts = Array.isArray(existingProfile.texts)
      ? existingProfile.texts
      : []

    const textRecord = {
      textId: poem.id,
      title: poem.title,
      supportLevel,
      totalHintUses,
      hintUsageByActivity: summary.hintUsageByActivity,
      completedActivities: completedActivities.length,
      completedAt: summary.completedAt,
    }

    const nextTexts = [
      ...previousTexts.filter((item) => item.textId !== poem.id),
      textRecord,
    ]

    localStorage.setItem(
      "studentLearningProfile",
      JSON.stringify({
        ...existingProfile,
        currentSupportLevel: supportLevel,
        totalHintUses: previousHintUses + totalHintUses,
        hintUsageByText: nextTexts,
        latestLearningSummary: summary,
        lastUpdatedAt: new Date().toISOString(),
      }),
    )

    navigate("/student/summary")
  }

  const prompts =
    activityPrompts[activeActivity]?.[supportLevel] || []

  const tables =
    activityTables[`${activeActivity}-${supportLevel}`] || []

  const hints =
    hintData[`${activeActivity}-${supportLevel}`] || []

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-gray-800">
      <header className="sticky top-0 z-30 border-b border-[#eadfd5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a16207]">
              LUYỆN TẬP ĐỌC HIỂU THƠ
            </p>

            <h1 className="mt-1 text-xl font-bold text-[#7f1d2d]">
              Nguyệt Cầm
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-xl bg-[#fff8ee] px-3 py-2 text-sm font-semibold text-[#8f1d2c] sm:inline-flex">
              {supportInfo.label} · {supportInfo.shortName}
            </span>

            <button
              type="button"
              onClick={() => navigate("/student/texts")}
              className="rounded-xl border border-[#eadfd5] bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-[#fff8ee]"
            >
              Văn bản
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                MỨC HỖ TRỢ HIỆN TẠI
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-800">
                {supportInfo.label} — {supportInfo.shortName}
              </h2>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-gray-500">
                {supportInfo.description}
              </p>
            </div>

            <div className="min-w-[220px]">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Tiến độ luyện tập</span>
                <span>{progress}%</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#8f1d2c] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#fffaf0] px-4 py-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                Hành vi hỗ trợ
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Số lần mở gợi ý trong văn bản này
              </p>
            </div>

            <span className="rounded-xl bg-white px-4 py-2 text-lg font-bold text-[#7f1d2d] ring-1 ring-[#eadfd5]">
              {totalHintUses}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)_390px]">
          <aside className="h-fit rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[#eadfd5] lg:sticky lg:top-28">
            <p className="px-2 text-xs font-bold uppercase tracking-wide text-[#a16207]">
              Hoạt động
            </p>

            <div className="mt-3 space-y-2">
              {activities.map((activity) => {
                const isActive = activity.id === activeActivity
                const isCompleted =
                  completedActivities.includes(activity.id)

                const isLocked =
                  activity.id > 1 &&
                  !completedActivities.includes(activity.id - 1)

                return (
                  <button
                    key={activity.id}
                    type="button"
                    disabled={isLocked}
                    onClick={() =>
                      handleActivityChange(activity.id)
                    }
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                      isActive
                        ? "bg-[#8f1d2c] text-white"
                        : isLocked
                          ? "cursor-not-allowed bg-gray-50 text-gray-300"
                          : "bg-white text-gray-700 hover:bg-[#fff8ee]"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isActive
                          ? "bg-white/15 text-white"
                          : isCompleted
                            ? "bg-[#f6eee6] text-[#8f1d2c]"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isCompleted ? "✓" : activity.id}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        {activity.shortTitle}
                      </p>

                      <p
                        className={`mt-0.5 text-xs ${
                          isActive
                            ? "text-white/70"
                            : "text-gray-400"
                        }`}
                      >
                        Hoạt động {activity.id}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          <section className="rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd5]">
            <div className="border-b border-[#eadfd5] bg-[#fffdf9] px-6 py-6 text-center md:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a16207]">
                ĐỌC VĂN BẢN
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#7f1d2d]">
                NGUYỆT CẦM
              </h2>

              <p
                className="mt-1 text-base italic text-gray-600"
                style={{
                  fontFamily: '"Times New Roman", Times, serif',
                }}
              >
                - Xuân Diệu -
              </p>
            </div>

            <div className="px-6 py-8 md:px-10">
              <div
                className="text-xl italic leading-[1.9] text-gray-900 md:text-[22px]"
                style={{
                  fontFamily: '"Times New Roman", Times, serif',
                }}
              >
                {poemStanzas.map((stanza, stanzaIndex) => (
                  <div
                    key={stanzaIndex}
                    className={
                      stanzaIndex < poemStanzas.length - 1
                        ? "mb-8"
                        : ""
                    }
                  >
                    {stanza.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ))}

                <div className="mt-8 border-t border-[#eadfd5] pt-5 text-right text-[15px] leading-7 not-italic text-gray-600">
                  {poem.source}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                  Những câu thơ / hình ảnh được sử dụng trong nhiệm vụ
                </p>

                <div className="mt-3 space-y-2">
                  {highlightedLines.map((line) => (
                    <p
                      key={line}
                      className="rounded-xl bg-[#fffdf9] px-4 py-2 text-base italic leading-7 text-gray-800 ring-1 ring-[#eadfd5]"
                      style={{
                        fontFamily:
                          '"Times New Roman", Times, serif',
                      }}
                    >
                      “{line}”
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-[#eadfd5] pt-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-gray-500">
                    Em có thể ghi chú trong quá trình đọc.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setShowNoteBox((current) => !current)
                    }
                    className="rounded-lg bg-[#f6eee6] px-3 py-1.5 text-xs font-semibold text-[#7f1d2d]"
                  >
                    {showNoteBox ? "Ẩn ghi chú" : "Ghi chú"}
                  </button>
                </div>

                {showNoteBox && (
                  <textarea
                    value={note}
                    onChange={(event) =>
                      setNote(event.target.value)
                    }
                    rows={4}
                    placeholder="Ghi lại điều em chú ý trong văn bản..."
                    className="mt-3 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#8f1d2c]"
                  />
                )}
              </div>
            </div>
          </section>

          <aside
            id={`activity-${currentActivity.id}`}
            className="h-fit space-y-4 lg:sticky lg:top-28"
          >
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-lg bg-[#8f1d2c] px-2.5 py-1 text-xs font-bold text-white">
                  Hoạt động {currentActivity.id}
                </span>

                <span className="text-xs font-medium text-gray-400">
                  {completedActivities.includes(
                    currentActivity.id,
                  )
                    ? "Đã hoàn thành"
                    : "Đang thực hiện"}
                </span>
              </div>

              <h2 className="mt-4 text-lg font-bold leading-7 text-gray-800">
                {currentActivity.title}
              </h2>

              <div className="mt-4 rounded-2xl bg-[#fff8ee] p-4 ring-1 ring-[#eadfd5]">
                <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                  {supportInfo.label} · {supportInfo.shortName}
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {supportInfo.description}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]">
              <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                Nhiệm vụ
              </p>

              {activeActivity === 1 && (
                <>
                  <p className="mt-3 text-sm font-semibold leading-6 text-gray-800">
                    Chọn những hình ảnh trong bài thơ mà em muốn phân tích.
                  </p>

                  <div className="mt-3 space-y-2">
                    {sensoryTargets.map((target) => (
                      <button
                        key={target}
                        type="button"
                        onClick={() => toggleTarget(target)}
                        className={`w-full rounded-xl border px-3 py-2 text-left text-sm italic transition ${
                          selectedTargets.includes(target)
                            ? "border-[#8f1d2c] bg-[#f6eee6] text-[#7f1d2d]"
                            : "border-gray-200 bg-white text-gray-600 hover:border-[#d8b6a4]"
                        }`}
                      >
                        <span className="mr-2">
                          {selectedTargets.includes(target)
                            ? "✓"
                            : "○"}
                        </span>
                        “{target}”
                      </button>
                    ))}
                  </div>

                  {selectedTargets.length > 0 && (
                    <div className="mt-4 rounded-2xl bg-[#fffaf2] p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                        Hình ảnh đã chọn
                      </p>

                      <ul className="mt-2 space-y-1 text-xs leading-5 text-gray-600">
                        {selectedTargets.map((target) => (
                          <li key={target}>• {target}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              <div className="mt-5 space-y-5">
                {prompts.map((prompt, index) => {
                  const stepKey = `${activeActivity}-${supportLevel}-${index}`

                  return (
                    <div key={stepKey}>
                      <p className="text-sm font-bold leading-6 text-gray-800">
                        Bước {index + 1}
                      </p>

                      <p className="mt-1 whitespace-pre-line text-sm leading-6 text-gray-600">
                        {prompt}
                      </p>

                      <textarea
                        value={getAnswer(
                          activeActivity,
                          index,
                        )}
                        onChange={(event) =>
                          updateAnswer(
                            activeActivity,
                            index,
                            event.target.value,
                          )
                        }
                        rows={5}
                        placeholder="Viết câu trả lời của em..."
                        className="mt-2 w-full resize-y rounded-2xl border border-gray-200 bg-[#fffdf9] px-4 py-3 text-sm leading-6 text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/10"
                      />

                      {tables
                        .filter((table) =>
                          table.title.startsWith(
                            `Bước ${index + 1}`,
                          ),
                        )
                        .map((table) => (
                          <QuestionTable
                            key={table.title}
                            table={table}
                          />
                        ))}
                    </div>
                  )
                })}
              </div>

              {hints.length > 0 && (
                <div className="mt-6 border-t border-[#eadfd5] pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                        Gợi ý hỗ trợ
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Gợi ý chỉ xuất hiện khi em chủ động yêu cầu.
                      </p>
                    </div>

                    <span className="rounded-full bg-[#fff8ee] px-3 py-1 text-xs font-semibold text-[#8a5a00]">
                      Đã mở {getActivityHintCount(activeActivity)}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    {hints.map((hint, index) => {
                      const hintKey = `${activeActivity}-${supportLevel}-hint-${index}`

                      return (
                        <HintBox
                          key={hintKey}
                          hint={hint}
                          hintKey={hintKey}
                          revealed={Boolean(
                            revealedHints[hintKey],
                          )}
                          onReveal={revealHint}
                        />
                      )
                    })}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleCompleteActivity}
                className="mt-5 w-full rounded-2xl bg-[#8f1d2c] px-5 py-3 font-semibold text-white transition hover:bg-[#741624]"
              >
                {activeActivity === activities.length
                  ? "Hoàn thành luyện tập"
                  : "Hoàn thành hoạt động"}
              </button>
            </div>
          </aside>
        </div>

        {completedActivities.length === activities.length && (
          <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-bold text-gray-800">
                  Em đã hoàn thành 5 hoạt động
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Tổng số lần mở gợi ý:{" "}
                  <strong>{totalHintUses}</strong>. Dữ liệu đã được
                  lưu vào kết quả luyện tập và hồ sơ học tập.
                </p>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="rounded-2xl bg-[#8f1d2c] px-7 py-3.5 font-semibold text-white transition hover:bg-[#741624]"
              >
                Xem kết quả
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
