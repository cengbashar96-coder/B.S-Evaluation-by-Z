import React, { useState } from 'react';

const BeamsInterface = () => {
  // تعريف المتغيرات الهندسية (أبعاد المقطع)
  const [b, setB] = useState(250); // عرض الجائز mm
  const [h, setH] = useState(600); // الارتفاع الكلي mm
  const [fc, setFc] = useState(25); // مقاومة البيتون MPa
  const [fy, setFy] = useState(400); // إجهاد الخضوع للحديد MPa

  return (
    <div className="p-4 bg-gray-50 min-h-screen" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-blue-100">
        {/* الهيدر الهندي */}
        <div className="bg-blue-800 p-6 text-white text-right rounded-t-2xl">
          <h2 className="text-2xl font-bold">تقييم الجوائز الإنشائية</h2>
          <p className="text-blue-100 text-sm mt-1">مطابق للكود العربي السوري - ملحق الزلازل</p>
        </div>

        <div className="p-6 space-y-8">
          {/* قسم أبعاد المقطع */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-blue-900 border-r-4 border-blue-600 pr-3 text-right">أبعاد المقطع العرضي</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 text-right">العرض b (mm)</label>
                <input 
                  type="number" 
                  value={b}
                  onChange={(e) => setB(Number(e.target.value))}
                  className="w-full p-3 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center font-bold text-blue-900"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 text-right">الارتفاع h (mm)</label>
                <input 
                  type="number" 
                  value={h}
                  onChange={(e) => setH(Number(e.target.value))}
                  className="w-full p-3 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center font-bold text-blue-900"
                />
              </div>
            </div>
          </section>

          {/* قسم خواص المواد */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-green-800 border-r-4 border-green-600 pr-3 text-right">خواص المواد</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 text-right">البيتون f'c (MPa)</label>
                <input 
                  type="number" 
                  value={fc}
                  onChange={(e) => setFc(Number(e.target.value))}
                  className="w-full p-3 bg-green-50 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-center font-bold text-green-900"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 text-right">حديد التسليح fy (MPa)</label>
                <input 
                  type="number" 
                  value={fy}
                  onChange={(e) => setFy(Number(e.target.value))}
                  className="w-full p-3 bg-green-50 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-center font-bold text-green-900"
                />
              </div>
            </div>
          </section>

          {/* زر التقييم والحساب */}
          <button className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95">
            إجراء التحليل الإنشائي
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeamsInterface;
