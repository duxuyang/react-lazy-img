import React, { ReactNode, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactElement } from 'react'
import classNames from 'classnames'
import './index.less';

export interface NativeProps<S extends string = never> {
  className?: string
  style?: CSSProperties & Partial<Record<S, string>>
  tabIndex?: number
}

type ImageProps = {
  src: string;
  failSrc?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' | undefined;
  placeholder?: ReactNode;
  fallback?: ReactNode;
  onClick?: () => void;
  rootMargin?: string;
  threshold?: number | number[];
  root?: HTMLDivElement;
} & NativeProps<'--width' | '--height'>;

const classPrefix = `dxy-image`;
const toCSSLength = (val: string | number) => {
  return typeof val === 'number' ? `${val}px` : val;
};

const defaultProps = {
  fit: 'fill',
  placeholder: (
    <div className={`${classPrefix}-tip`}>{/* <PictureOutline /> */}</div>
  ),
  fallback: (
    <div className={`${classPrefix}-tip`}>{/* <PictureWrongOutline /> */}</div>
  ),
};

export function withNativeProps(
  props: any,
  element: ReactElement
) {
  const p = {
    ...element.props,
  }
  if (props.className) {
    p.className = classNames(element.props.className, props.className)
  }
  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    }
  }
  if (props.tabIndex !== undefined) {
    p.tabIndex = props.tabIndex
  }
  for (const key in props) {
    if (!props.hasOwnProperty(key)) continue
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = props[key]
    }
  }
  return React.cloneElement(element, p)
}

const Index =(props: ImageProps) => {
  const { src,failSrc, alt, width, height, onClick, root, rootMargin, threshold } = {
    ...defaultProps,
    ...props,
  };
  const currentRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const currentElem = currentRef.current;
    let observer: any;
    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype
    ) {
      observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entries[0].target); // 停止观察
            observer.disconnect(); // 关闭观察器
          }
        },
        {
          root: root || null,
          rootMargin: rootMargin || '0px',
          threshold: threshold || 0,
        }
      );
      if (currentElem && observer && observer.observe) {
        observer.observe(currentElem);
      }
    } else {
      setIsVisible(true);
    }
    return () => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
  }, []);

  const style: any = {};
  if (props.width) {
    style['--width'] = toCSSLength(props.width);
  }
  if (props.height) {
    style['--height'] = toCSSLength(props.height);
  }

  return withNativeProps(props, <div className={classPrefix} style={style} ref={currentRef}>
    {isVisible ? (
      <img
        className={`${classPrefix}-img`}
        src={!failed?src:failSrc}
        alt={alt}
        onClick={onClick}
        onLoad={() => {
          // setState({ loaded: true });
        }}
        onError={() => {
          setFailed(true);
        }}
        style={{
          objectFit: props.fit,
        }}
      />
    ) : (
      <span
        style={{
          display: 'inline-block',
          width: width || 'auto',
          height: height || 'auto',
          backgroundColor: '#f3f3f3',
        }}
      ></span>
    )}
  </div>);
};

export default Index;
