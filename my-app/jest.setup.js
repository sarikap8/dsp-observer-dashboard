// jest.setup.js
import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Polyfill for Request/Response in Next.js API routes
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Prisma client for tests
jest.mock('./src/lib/db', () => ({
  __esModule: true,
  default: {
    observer: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    dsp: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    observerSubmission: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    dspSubmission: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    questionResponse: {
      create: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback({
      observer: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      dsp: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      observerSubmission: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      dspSubmission: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      questionResponse: {
        create: jest.fn(),
        update: jest.fn(),
      },
    })),
  },
  prisma: {
    observer: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    dsp: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));
