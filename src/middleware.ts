import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  let token = request.cookies.get("ccm.token");
  let isAdminCookie = request.cookies.get("ccm.isAdmin");
  let url = request.url;

  let isAdmin = isAdminCookie && isAdminCookie.value === "true";

  if (url.includes("/SellerHome") && (!token || !isAdmin)) {
    return NextResponse.redirect(new URL("/", url));
  }
};

export const confi = {
  matcher: ["/", "SellerHome"],
};
