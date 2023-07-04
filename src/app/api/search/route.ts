import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { searchTerm, pages, ...params } = await request.json();
    const searchParams: SearchParams = params;

    if (!searchTerm) {
        return NextResponse.next(
            new Response("Missing search term", { status: 400 })
        );
    }

    const filters: any = [];

    Object.entries(searchParams).forEach(([key, value]) => {
        if (value) {
            if (key == 'max_price') {
                if ((value = '1000+')) return;
            }

            filters.push({
                key,
                value: key === 'sort_by' ? value : Number(value),
            });
        }
    });
}