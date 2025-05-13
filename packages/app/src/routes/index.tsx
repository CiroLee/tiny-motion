import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import Layout from '@/layout';
import { lazy } from 'react';

export type CustomRouteObject = RouteObject & {
  meta?: {
    name: string;
    visible?: boolean;
    level?: string;
    order?: number;
    type?: string;
  };
};

export const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <Layout />,
    children: [
      {
        path: '/',
        id: 'home',
        Component: lazy(() => import('@/pages/home'))
      },
      {
        path: '/docs',
        id: 'docs',
        Component: lazy(() => import('@/pages/docs')),
        children: [
          {
            index: true,
            element: <Navigate to="/docs/overview" replace />
          },
          {
            path: '/docs/overview',
            id: 'overview',
            Component: lazy(() => import('@/pages/docs/overview')),
            meta: {
              name: 'overview',
              visible: true,
              type: 'hook'
            }
          },
          {
            path: 'use-animate',
            id: 'use-animate',
            Component: lazy(() => import('@/pages/docs/use-animate.doc')),
            meta: {
              name: 'useAnimate',
              type: 'hook'
            }
          },
          {
            path: 'use-motion',
            id: 'use-motion',
            Component: lazy(() => import('../pages/docs/use-motion.doc')),
            meta: {
              name: 'useMotion',
              type: 'hook'
            }
          },
          {
            path: 'use-group',
            id: 'use-group',
            Component: lazy(() => import('../pages/docs/use-group.doc')),
            meta: {
              name: 'useGroup',
              type: 'hook'
            }
          },
          {
            path: 'use-multiple',
            id: 'use-multiple',
            Component: lazy(() => import('../pages/docs/use-multiple.doc')),
            meta: {
              name: 'useMultiple',
              type: 'hook'
            }
          },
          {
            path: 'use-in-view',
            id: 'use-in-view',
            Component: lazy(() => import('../pages/docs/use-in-view.doc')),
            meta: {
              name: 'useInView',
              type: 'hook'
            }
          },
          {
            path: 'use-line-draw',
            id: 'use-line-draw',
            Component: lazy(() => import('../pages/docs/use-line-draw.doc')),
            meta: {
              name: 'useLineDraw',
              type: 'hook'
            }
          },
          {
            path: 'use-value',
            id: 'use-value',
            Component: lazy(() => import('../pages/docs/use-value.doc')),
            meta: {
              name: 'useValue',
              level: 'non-waapi',
              type: 'hook'
            }
          },
          {
            path: 'use-spring',
            id: 'use-spring',
            Component: lazy(() => import('../pages/docs/use-spring.doc')),
            meta: {
              name: 'useSpring',
              level: 'non-waapi',
              type: 'hook'
            }
          },
          {
            path: 'animate',
            id: 'animate',
            Component: lazy(() => import('../pages/docs/animate.doc')),
            meta: {
              name: 'animate',
              type: 'universal'
            }
          }
        ],
        meta: {
          name: 'docs',
          visible: true,
          order: 1
        }
      },
      {
        path: '/presets',
        id: 'presets',
        Component: lazy(() => import('@/pages/presets'))
      }
    ]
  }
] as CustomRouteObject[]);
