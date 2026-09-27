import React, { useState } from "react";

// Thao tác
import thaoTac1 from "../../assets/knowledge/thao-tac-1.png";
import thaoTac2 from "../../assets/knowledge/thao-tac-2.png";

// Tri thức
import triThuc1 from "../../assets/knowledge/tri-thuc-1.png";
import triThuc2 from "../../assets/knowledge/tri-thuc-2.png";
import triThuc3 from "../../assets/knowledge/tri-thuc-3.png";
import triThuc4 from "../../assets/knowledge/tri-thuc-4.jpg";
import triThuc5 from "../../assets/knowledge/tri-thuc-5.png";
import triThuc6 from "../../assets/knowledge/tri-thuc-6.jpg";
import triThuc7 from "../../assets/knowledge/tri-thuc-7.png";
import triThuc8 from "../../assets/knowledge/tri-thuc-8.png";

const knowledgeData = {
  thaoTac: [
    {
      id: 1,
      title: "Thao tác 1",
      image: thaoTac1,
    },
    {
      id: 2,
      title: "Thao tác 2",
      image: thaoTac2,
    },
  ],

  triThuc: [
    {
      id: 1,
      title: "Tri thức 1",
      image: triThuc1,
    },
    {
      id: 2,
      title: "Tri thức 2",
      image: triThuc2,
    },
    {
      id: 3,
      title: "Tri thức 3",
      image: triThuc3,
    },
    {
      id: 4,
      title: "Tri thức 4",
      image: triThuc4,
    },
    {
      id: 5,
      title: "Tri thức 5",
      image: triThuc5,
    },
    {
      id: 6,
      title: "Tri thức 6",
      image: triThuc6,
    },
    {
      id: 7,
      title: "Tri thức 7",
      image: triThuc7,
    },
    {
      id: 8,
      title: "Tri thức 8",
      image: triThuc8,
    },
  ],
};

function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState("triThuc");
  const [selectedImage, setSelectedImage] = useState(null);

  const currentData = knowledgeData[activeTab];

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-indigo-600">
            KHO TRI THỨC
          </p>

          <h1 className="text-3xl font-bold text-slate-800">
            Khám phá và ôn tập
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Xem lại các kiến thức và thao tác hỗ trợ quá trình đọc hiểu văn bản.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setActiveTab("triThuc")}
            className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "triThuc"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white text-slate-600 shadow-sm hover:bg-slate-50"
            }`}
          >
            Tri thức
          </button>

          <button
            onClick={() => setActiveTab("thaoTac")}
            className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "thaoTac"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white text-slate-600 shadow-sm hover:bg-slate-50"
            }`}
          >
            Thao tác
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {currentData.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <h2 className="font-semibold text-slate-800">
                  {item.title}
                </h2>

                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                  {activeTab === "triThuc" ? "Tri thức" : "Thao tác"}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedImage(item)}
                className="block w-full cursor-zoom-in bg-slate-50 p-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-auto max-h-[520px] w-full object-contain"
                />
              </button>

              <div className="border-t border-slate-100 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setSelectedImage(item)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Xem lớn →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[95vh] max-w-5xl overflow-auto rounded-2xl bg-white p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="sticky right-0 top-0 z-10 ml-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-lg text-white hover:bg-slate-700"
            >
              ×
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-h-[85vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default KnowledgeBase;