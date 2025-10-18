"use client";

import { ReactNode, useEffect, useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { useServerInsertedHTML } from "next/navigation";

export default function StyledComponentsRegistry({
  children,
}: {
  children: ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useEffect(() => {
    return () => styledComponentsStyleSheet.seal();
  }, [styledComponentsStyleSheet]);

  useServerInsertedHTML(() => (
    <>{styledComponentsStyleSheet.getStyleElement()}</>
  ));

  if (typeof window === "undefined") {
    return (
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        {children}
      </StyleSheetManager>
    );
  }

  return <>{children}</>;
}
