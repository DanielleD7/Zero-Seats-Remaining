"use client";
import Link, { LinkProps } from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useCallback } from 'react'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  mode?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const usePageTransition = () => {
    
  
    const transition = async (router: AppRouterInstance, href: string, mode: string = 'right') => {
      const body = document.body
  
      body.classList.remove('page-transition-end')
      body.classList.add(`page-transition-${mode}`)
  
      await sleep(170)
  
      if (href !== 'PREV_PAGE') {
        await router.push(href)
      } else {
        await router.back()
      }
  
      await sleep(500)
  
      body.classList.add(`page-transition-${mode}2`)
      await sleep(20)
      body.classList.remove(`page-transition-${mode}2`)
  
      body.classList.remove(`page-transition-${mode}`)
      body.classList.add('page-transition-end')
    }
  
    return transition
  }
  

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  mode = "right",
  ...props
}) => {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const body = document.querySelector("body");
    const body2 = document.body;

    body?.classList.remove("page-transition-end");
    body?.classList.add("page-transition-"+mode);

    await sleep(170);

    if(href != "PREV_PAGE")
        await router.push(href);
    else
        await router.back();

    await sleep(160);


    body?.classList.add("page-transition-"+mode+"2")
    await sleep(20);
    body?.classList.remove("page-transition-"+mode+"2")

    body?.classList.remove("page-transition-"+mode);
    body?.classList.add("page-transition-end");
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};