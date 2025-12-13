/**
 * Tests for addDsp service function
 * 
 * Tests the business logic for adding new DSPs
 */

// Mock Prisma client
jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: {
    dsp: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    observer: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

import prisma from '@/lib/db';
import { addDsp, getAllDsps } from '@/lib/services/submissionService';

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('addDsp service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addDsp', () => {
    it('should successfully add a new DSP', async () => {
      // Mock: DSP doesn't exist yet
      (mockPrisma.dsp.findUnique as jest.Mock).mockResolvedValue(null);
      
      // Mock: DSP creation
      (mockPrisma.dsp.create as jest.Mock).mockResolvedValue({
        id: 'dsp-uuid-123',
        email: 'newdsp@example.com',
        name: 'New DSP',
        createdAt: new Date(),
      });

      const result = await addDsp('newdsp@example.com', 'New DSP');

      expect(result.success).toBe(true);
      expect(result.message).toBe('DSP added successfully');
      expect(result.data).toEqual({
        dspId: 'dsp-uuid-123',
        email: 'newdsp@example.com',
        name: 'New DSP',
      });
      
      expect(mockPrisma.dsp.findUnique).toHaveBeenCalledWith({
        where: { email: 'newdsp@example.com' },
      });
      
      expect(mockPrisma.dsp.create).toHaveBeenCalledWith({
        data: {
          email: 'newdsp@example.com',
          name: 'New DSP',
        },
      });
    });

    it('should return error if DSP email already exists', async () => {
      // Mock: DSP already exists
      (mockPrisma.dsp.findUnique as jest.Mock).mockResolvedValue({
        id: 'existing-uuid',
        email: 'existing@example.com',
        name: 'Existing DSP',
      });

      const result = await addDsp('existing@example.com', 'Duplicate DSP');

      expect(result.success).toBe(false);
      expect(result.message).toBe('A DSP with this email already exists');
      expect(result.error).toBe('DUPLICATE_EMAIL');
      
      // Should not try to create
      expect(mockPrisma.dsp.create).not.toHaveBeenCalled();
    });

    it('should normalize email to lowercase', async () => {
      (mockPrisma.dsp.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrisma.dsp.create as jest.Mock).mockResolvedValue({
        id: 'dsp-uuid',
        email: 'uppercase@example.com',
        name: 'Test DSP',
        createdAt: new Date(),
      });

      await addDsp('UPPERCASE@EXAMPLE.COM', 'Test DSP');

      expect(mockPrisma.dsp.findUnique).toHaveBeenCalledWith({
        where: { email: 'uppercase@example.com' },
      });
    });

    it('should create observer if observerEmail is provided and observer does not exist', async () => {
      (mockPrisma.dsp.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrisma.dsp.create as jest.Mock).mockResolvedValue({
        id: 'dsp-uuid',
        email: 'newdsp@example.com',
        name: 'New DSP',
        createdAt: new Date(),
      });
      
      // Observer doesn't exist
      (mockPrisma.observer.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrisma.observer.create as jest.Mock).mockResolvedValue({
        id: 'observer-uuid',
        email: 'observer@example.com',
        name: 'Observer',
      });

      const result = await addDsp('newdsp@example.com', 'New DSP', 'observer@example.com');

      expect(result.success).toBe(true);
      expect(mockPrisma.observer.findUnique).toHaveBeenCalledWith({
        where: { email: 'observer@example.com' },
      });
      expect(mockPrisma.observer.create).toHaveBeenCalledWith({
        data: {
          email: 'observer@example.com',
          name: 'Observer',
        },
      });
    });

    it('should not create observer if observerEmail is provided and observer already exists', async () => {
      (mockPrisma.dsp.findUnique as jest.Mock).mockResolvedValue(null);
      (mockPrisma.dsp.create as jest.Mock).mockResolvedValue({
        id: 'dsp-uuid',
        email: 'newdsp@example.com',
        name: 'New DSP',
        createdAt: new Date(),
      });
      
      // Observer already exists
      (mockPrisma.observer.findUnique as jest.Mock).mockResolvedValue({
        id: 'observer-uuid',
        email: 'observer@example.com',
        name: 'Existing Observer',
      });

      const result = await addDsp('newdsp@example.com', 'New DSP', 'observer@example.com');

      expect(result.success).toBe(true);
      expect(mockPrisma.observer.findUnique).toHaveBeenCalled();
      expect(mockPrisma.observer.create).not.toHaveBeenCalled();
    });

    it('should handle database errors gracefully', async () => {
      (mockPrisma.dsp.findUnique as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

      const result = await addDsp('newdsp@example.com', 'New DSP');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Failed to add DSP');
      expect(result.error).toBe('Database connection failed');
    });
  });
});

