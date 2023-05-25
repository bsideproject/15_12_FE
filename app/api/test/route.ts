import { NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export async function POST() {
	return NextResponse.json({ error: 'err' }, { status: 403 });
}
