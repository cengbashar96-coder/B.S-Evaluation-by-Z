import { NextResponse, NextRequest } from 'next/server';

export const runtime = 'edge';

// جلب قائمة المشاريع الهندسية
export async function GET() {
  const mockProjects = [
    { id: '1', name: 'مشروع بناء سكني - طابق أول', date: '2026-04-27' },
    { id: '2', name: 'تقييم فيلا سكنية - ريف دمشق', date: '2026-04-25' }
  ];

  return NextResponse.json({ 
    status: "success",
    message: "تم جلب قائمة المشاريع بنجاح",
    count: mockProjects.length,
    projects: mockProjects
  });
}

// إضافة مشروع جديد
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    return NextResponse.json({ 
      status: "success", 
      message: "تم البدء في إنشاء مشروع جديد",
      receivedData: data 
    });
  } catch (error) {
    return NextResponse.json({ 
      status: "error", 
      message: "خطأ في معالجة البيانات المرسلة" 
    }, { status: 400 });
  }
}
