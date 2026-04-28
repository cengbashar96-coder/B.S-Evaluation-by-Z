import React, { useState } from 'react';

const SlabsAndBeams = () => {
  const [activeTab, setActiveTab] = useState('slabs');

  return (
    <div className="min-h-screen bg-gray-100 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* التبديل بين البلاطات والجوائز */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
          <button 
            onClick={() => setActiveTab('slabs')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${activeTab === 'slabs' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}
          >
            تحليل البلاطات
          </button>
          <button 
            onClick={() => setActiveTab('beams')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${activeTab === 'beams' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}
          >
            تحليل الجوائز
          </button>
        </div>

        {/* محتوى الصفحة بناءً على الاختيار */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          {activeTab === 'slabs' ? (
            <div className="space-y-4 text-right">
              <h3 className="text-xl font-bold text-gray-800 border-r-4 border-blue-500 pr-2">حسابات البلاطات المصمتة (Slabs)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">سماكة البلاطة (ts) mm</label>
                  <input type="number" placeholder="150" className="p-3 bg-gray-50 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-center font-bold" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">الحمولة الحية (LL) kN/m²</label>
                  <input type="number" placeholder="2.5" className="p-3 bg-gray-50 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-center font-bold" />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              واجهة الجوائز مفعلة وجاهزة للربط...
            </div>
          )}
          
          <button className="w-full mt-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-md transition-transform active:scale-95">
            حفظ النتائج وتصدير التقرير
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlabsAndBeams;
