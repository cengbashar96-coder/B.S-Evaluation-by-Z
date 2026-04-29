import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // تعريفه كـ Promise للنسخ الحديثة
) {
  try {
    const { id } = await params; // انتظار المعرف

    return NextResponse.json({ 
      status: "success",
      message: `تم جلب بيانات المنشأة ذات الرقم المرجعي: ${id}`,
      data: {
        projectId: id,
        type: "Evaluation Report",
        standard: "Syrian Arab Code"
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      status: "error", 
      message: "فشل في استخراج بيانات المعرف" 
    }, { status: 400 });
  }
}
