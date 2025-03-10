import "../index";
import { container } from "tsyringe";
import { NextRequest, NextResponse } from "next/server";
import TextService from "@/app/api/services/texts.service";
import UtilApplication from "../utils/util.application";

export async function GET(): Promise<NextResponse> {
  try {
    const textService = container.resolve(TextService);
    const texts = await textService.getAll();
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
    const textService = container.resolve(TextService);
    const textCreate = await textService.postText({
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
    const textService = container.resolve(TextService);
    const textUpdate = await textService.putText({
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
    const textService = container.resolve(TextService);
    const textDelete = await textService.deleteText(id);

    console.log("text delete", textDelete);

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
