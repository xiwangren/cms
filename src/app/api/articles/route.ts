import { mockArticles } from "@/data/mockArticles"
import { NextResponse } from "next/server"
export async function GET(request) {
   return NextResponse.json({
    success: true,
    data: mockArticles
  });
}

// export async function POST(request) {

//   try {
//     // 模拟网络延迟
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     // 返回成功响应
//     return NextResponse.json({
//       success: true,
//       data: mockArticles
//     });
    
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: '内部服务器错误' },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request) {
  try {
    // 解析请求体中的参数
    const body = await request.json();
    const { id, category } = body;
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let resultData = mockArticles;
    
    // 根据 ID 查找特定文章
    if (id) {
      const foundArticle = mockArticles.find(article => article.id === id);
      
      if (foundArticle) {
        // 如果找到了指定 ID 的文章，只返回这一篇
        resultData = [foundArticle];
      } else {
        // 如果没有找到指定 ID 的文章，返回所有文章
        resultData = mockArticles;
        // 可以添加一个标志表示没有找到特定文章
        return NextResponse.json({
          success: true,
          data: resultData,
          message: `未找到 ID 为 ${id} 的文章，已返回所有文章`,
          foundById: false
        });
      }
    }
    
    // 根据分类筛选（如果指定了分类）
    if (category && category !== 'all') {
      resultData = resultData.filter(article => article.category === category);
    }
    
    return NextResponse.json({
      success: true,
      data: resultData,
      foundById: !!id, // 表示是否通过 ID 找到了特定文章
      total: resultData.length
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '内部服务器错误' },
      { status: 500 }
    );
  }
}