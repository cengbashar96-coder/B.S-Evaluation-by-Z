import { NextResponse } from 'next/server';

// إعداد التشغيل على بيئة Edge لتوافق Cloudflare
export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // تعريف params كـ Promise
) {
  try {
    // الانتظار للحصول على المعرف (id) - تحديث Next.js 15
    const { id } = await params;

    // هنا يمكنك إضافة منطق جلب البيانات من قاعدة البيانات إذا أردت
    // حالياً سنعيد استجابة تجريبية للتأكد من عمل الـ API
    return NextResponse.json({
      status: "success",
      message: `تم الوصول إلى مشروعك بنجاح`,
      data: {
        projectId: id,
        timestamp: new Date().toISOString(),
        environment: "Cloudflare Pages"
      }
    });
  } catch (error) {
    console.error("Error in API Route:", error);
    return NextResponse.json({
      status: "error",
      message: "حدث خطأ أثناء معالجة الطلب"
    }, { status: 500 });
  }
}
