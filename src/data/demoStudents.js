const demoStudents = [
    {
      id: "HS001",
      name: "Nguyễn Minh Anh",
      level: 1,
      progress: 18,
      load: 4.2,
      texts: 1,
      activeToday: true,
      last: "Hoàn thành hoạt động Từ ngữ / Hình ảnh",
  
      studyTime: "42 phút",
      initialAssessment: "Mức 1 – Hỗ trợ cao",
  
      challenge: "Chưa thực hiện",
      challengeResult: "Chưa thực hiện",
      challengeDetail:
        "Học sinh chưa hoàn thành đủ quá trình luyện tập để thực hiện thử thách chuyển mức.",
  
      recentActivities: [
        {
          activity: "Từ ngữ / Hình ảnh",
          result: "Đã hoàn thành",
          score: "7.5/10",
        },
        {
          activity: "Tổng kết và tự đánh giá",
          result: "Đã hoàn thành",
          score: "8/10",
        },
      ],
  
      notes:
        "Học sinh cần nhiều gợi ý khi xác định giá trị biểu đạt của từ ngữ và hình ảnh.",
  
      feedbackHistory: [],
    },
  
    {
      id: "HS002",
      name: "Trần Gia Huy",
      level: 1,
      progress: 35,
      load: 3.9,
      texts: 2,
      activeToday: true,
      last: "Hoàn thành thử thách chuyển mức",
  
      studyTime: "1 giờ 18 phút",
      initialAssessment: "Mức 1 – Hỗ trợ cao",
  
      challenge: "Không đạt",
      challengeResult: "Không đạt",
      challengeDetail:
        "Đã thể hiện được nhận định nhưng phần dẫn chứng và lí giải mối quan hệ giữa dẫn chứng với luận điểm còn chưa đầy đủ.",
  
      recentActivities: [
        {
          activity: "Yếu tố tượng trưng",
          result: "Đã hoàn thành",
          score: "7/10",
        },
        {
          activity: "Cấu tứ",
          result: "Đã hoàn thành",
          score: "6.5/10",
        },
        {
          activity: "Transition Challenge",
          result: "Không đạt",
          score: "Chưa đạt",
        },
      ],
  
      notes:
        "Có khả năng nhận diện ý chính nhưng cần hỗ trợ khi xây dựng lập luận dựa trên bằng chứng.",
  
      feedbackHistory: [],
    },
  
    {
      id: "HS003",
      name: "Lê Khánh Linh",
      level: 2,
      progress: 52,
      load: 3.1,
      texts: 4,
      activeToday: true,
      last: "Hoàn thành Cấu tứ",
  
      studyTime: "2 giờ 06 phút",
      initialAssessment: "Mức 1 – Hỗ trợ cao",
  
      challenge: "Đã đạt",
      challengeResult: "Đạt – đã chuyển sang Mức 2",
      challengeDetail:
        "Học sinh đáp ứng điều kiện về nhận định, dẫn chứng, lí giải và các chỉ báo hành vi học tập.",
  
      recentActivities: [
        {
          activity: "Từ ngữ / Hình ảnh",
          result: "Đã hoàn thành",
          score: "8/10",
        },
        {
          activity: "Yếu tố tượng trưng",
          result: "Đã hoàn thành",
          score: "8.5/10",
        },
        {
          activity: "Nhịp điệu / Âm thanh",
          result: "Đã hoàn thành",
          score: "8/10",
        },
        {
          activity: "Transition Challenge",
          result: "Đạt",
          score: "Đã chuyển mức",
        },
      ],
  
      notes:
        "Khả năng tự phân tích đang cải thiện. Học sinh bắt đầu chủ động yêu cầu hỗ trợ khi cần.",
  
      feedbackHistory: [],
    },
  
    {
      id: "HS004",
      name: "Phạm Hoàng Nam",
      level: 2,
      progress: 67,
      load: 2.9,
      texts: 5,
      activeToday: false,
      last: "Hoàn thành hoạt động Nhịp điệu / Âm thanh",
  
      studyTime: "2 giờ 48 phút",
      initialAssessment: "Mức 2 – Hỗ trợ vừa",
  
      challenge: "Đã đạt",
      challengeResult: "Đã đạt – tiếp tục Mức 2",
      challengeDetail:
        "Học sinh đã đạt thử thách chuyển mức gần nhất và đang tiếp tục luyện tập ở mức hỗ trợ hiện tại.",
  
      recentActivities: [
        {
          activity: "Nhịp điệu / Âm thanh",
          result: "Đã hoàn thành",
          score: "8.5/10",
        },
        {
          activity: "Cảm xúc / Chủ thể trữ tình",
          result: "Đã hoàn thành",
          score: "9/10",
        },
        {
          activity: "Tổng kết và tự đánh giá",
          result: "Đã hoàn thành",
          score: "8.5/10",
        },
      ],
  
      notes:
        "Có xu hướng tự giải quyết nhiệm vụ trước khi yêu cầu gợi ý. Cần tiếp tục theo dõi khả năng lập luận.",
  
      feedbackHistory: [],
    },
  
    {
      id: "HS005",
      name: "Võ Ngọc Mai",
      level: 3,
      progress: 84,
      load: 2.1,
      texts: 7,
      activeToday: true,
      last: "Hoàn thành Transition Challenge",
  
      studyTime: "4 giờ 12 phút",
      initialAssessment: "Mức 2 – Hỗ trợ vừa",
  
      challenge: "Đã đạt",
      challengeResult: "Đạt – đã chuyển sang Mức 3",
      challengeDetail:
        "Học sinh xây dựng được lập luận tương đối độc lập, sử dụng dẫn chứng phù hợp và giải thích được mối quan hệ giữa dẫn chứng với nhận định.",
  
      recentActivities: [
        {
          activity: "Cấu tứ",
          result: "Đã hoàn thành",
          score: "9/10",
        },
        {
          activity: "Tổng kết và tự đánh giá",
          result: "Đã hoàn thành",
          score: "9/10",
        },
        {
          activity: "Transition Challenge",
          result: "Đạt",
          score: "Đã chuyển mức",
        },
      ],
  
      notes:
        "Học sinh có khả năng tự điều chỉnh chiến lược đọc và ít phụ thuộc vào gợi ý.",
  
      feedbackHistory: [],
    },
  
    {
      id: "HS006",
      name: "Nguyễn Tuấn Kiệt",
      level: 3,
      progress: 96,
      load: 1.7,
      texts: 8,
      activeToday: false,
      last: "Hoàn thành văn bản mới",
  
      studyTime: "5 giờ 36 phút",
      initialAssessment: "Mức 2 – Hỗ trợ vừa",
  
      challenge: "Đã đạt",
      challengeResult: "Đã đạt – Mức 3",
      challengeDetail:
        "Học sinh thực hiện nhiệm vụ với mức hỗ trợ thấp, đáp ứng các yêu cầu về lập luận và có số lần yêu cầu hỗ trợ thấp.",
  
      recentActivities: [
        {
          activity: "Cấu tứ",
          result: "Đã hoàn thành",
          score: "9.5/10",
        },
        {
          activity: "Cảm xúc / Chủ thể trữ tình",
          result: "Đã hoàn thành",
          score: "9.5/10",
        },
        {
          activity: "Transition Challenge",
          result: "Đạt",
          score: "Đã chuyển mức",
        },
      ],
  
      notes:
        "Khả năng phân tích và khái quát tốt. Có thể tiếp tục theo dõi ở mức hỗ trợ thấp.",
  
      feedbackHistory: [],
    },
  ]
  
  export default demoStudents