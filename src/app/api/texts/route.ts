import { NextRequest, NextResponse } from "next/server";
import UtilApplication from "../utils/util.application";
import { textService as TextService } from "../services/texts.service";
import { ITextResponse } from "@/app/core/application/dto/textResponse";

async function GET_BY_PAGINATION(
  page: number,
  size: number
): Promise<NextResponse> {
  try {
    const [values, length]: [ITextResponse, number] =
      await TextService.getWithPagination(page, size);
    return NextResponse.json(
      {
        message: "Get texts by pagination success",
        statusCode: 200,
        data: values,
        length: length,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}

async function GET_ALL(): Promise<NextResponse> {
  try {
    const texts = await TextService.getTexts();
    if (!texts) {
      return NextResponse.json(
        {
          message: "No data available",
          statusCode: 404,
          data: [],
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Get all texts success",
        statusCode: 200,
        data: texts,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const page = req.nextUrl.searchParams.get("page");
  const size = req.nextUrl.searchParams.get("size");

  if (page && size) {
    return GET_BY_PAGINATION(parseInt(page), parseInt(size));
  }
  return GET_ALL();
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { category, subcategory, name, description, id } = await req.json();
  const verifyParams = UtilApplication.verifyAllParams(
    category,
    subcategory,
    name,
    description
  );
  if (!verifyParams) {
    return NextResponse.json(
      {
        message: "Error. Is required all params",
        statusCode: 400,
        data: [],
      },
      { status: 400 }
    );
  }
  try {
    const textCreate = await TextService.postText({
      category,
      description,
      name,
      subcategory,
      id,
    });
    if (!textCreate) {
      return NextResponse.json({
        message: "Is required id. Try again...",
        statusCode: 400,
        data: [],
      });
    }

    if (textCreate?.message === "found") {
      return NextResponse.json({
        message: "Text Exists. Try again!",
        statusCode: 400,
        data: [],
      });
    }

    return NextResponse.json(
      {
        message: textCreate.message,
        statusCode: 201,
        data: [],
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: error,
        statusCode: 500,
        data: [],
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        message: "Error. Is required id",
        statusCode: 400,
        data: [],
      },
      { status: 400 }
    );
  }

  const { category, description, name, subcategory } = await req.json();
  const verifyParams = UtilApplication.verifyAllParams(
    category,
    description,
    name,
    subcategory
  );

  if (!verifyParams) {
    return NextResponse.json(
      {
        message: "Is required all params",
        statusCode: 400,
        data: [],
      },
      { status: 400 }
    );
  }

  try {
    const textUpdate = await TextService.putText({
      category,
      description,
      name,
      subcategory,
      id,
    });

    if (textUpdate.message === "not found") {
      return NextResponse.json(
        {
          message: "Text not found",
          statusCode: 404,
          data: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Updated text correctly",
        statusCode: 200,
        data: [],
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: error,
        statusCode: 500,
        data: [],
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      {
        message: "Is required id",
        statusCode: 400,
        data: [],
      },
      { status: 400 }
    );
  }

  try {
    const textDelete = await TextService.deleteText(id);
    if (textDelete.message === "not found") {
      return NextResponse.json(
        {
          message: "Text not found",
          statusCode: 404,
          data: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Deleted text correctly",
        statusCode: 200,
        data: [],
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: error,
        statusCode: 500,
        data: [],
      },
      { status: 500 }
    );
  }
}
