/**
 * Tests for /api/dsps endpoint
 * 
 * Tests the ability for observers to add new DSPs
 */

// Mock NextResponse before importing the route
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn((body, init) => ({
      status: init?.status || 200,
      json: async () => body,
    })),
  },
}));

// Mock the submission service
jest.mock('@/lib/services/submissionService', () => ({
  addDsp: jest.fn(),
  getAllDsps: jest.fn(),
}));

import { addDsp, getAllDsps } from '@/lib/services/submissionService';
import { GET, POST } from '@/app/api/dsps/route';

const mockAddDsp = addDsp as jest.MockedFunction<typeof addDsp>;
const mockGetAllDsps = getAllDsps as jest.MockedFunction<typeof getAllDsps>;

// Helper to create mock NextRequest
function createMockRequest(body: object) {
  return {
    json: async () => body,
  };
}

describe('/api/dsps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/dsps - Add new DSP', () => {
    it('should successfully add a new DSP', async () => {
      mockAddDsp.mockResolvedValue({
        success: true,
        message: 'DSP added successfully',
        data: {
          dspId: 'uuid-123',
          email: 'newdsp@example.com',
          name: 'New DSP',
        },
      });

      const request = createMockRequest({
        dspEmail: 'newdsp@example.com',
        dspName: 'New DSP',
        observerEmail: 'observer@example.com',
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.message).toBe('DSP added successfully');
      expect(mockAddDsp).toHaveBeenCalledWith(
        'newdsp@example.com',
        'New DSP',
        'observer@example.com'
      );
    });

    it('should return 400 if dspEmail is missing', async () => {
      const request = createMockRequest({
        dspName: 'New DSP',
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toBe('DSP email is required');
      expect(mockAddDsp).not.toHaveBeenCalled();
    });

    it('should return 400 if dspName is missing', async () => {
      const request = createMockRequest({
        dspEmail: 'newdsp@example.com',
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toBe('DSP name is required');
      expect(mockAddDsp).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid email format', async () => {
      const request = createMockRequest({
        dspEmail: 'invalid-email',
        dspName: 'New DSP',
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Invalid DSP email format');
      expect(mockAddDsp).not.toHaveBeenCalled();
    });

    it('should return 409 if DSP email already exists', async () => {
      mockAddDsp.mockResolvedValue({
        success: false,
        message: 'A DSP with this email already exists',
        error: 'DUPLICATE_EMAIL',
      });

      const request = createMockRequest({
        dspEmail: 'existing@example.com',
        dspName: 'Existing DSP',
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.success).toBe(false);
      expect(data.error).toBe('DUPLICATE_EMAIL');
    });

    it('should work without observerEmail', async () => {
      mockAddDsp.mockResolvedValue({
        success: true,
        message: 'DSP added successfully',
        data: {
          dspId: 'uuid-456',
          email: 'nodsp@example.com',
          name: 'No Observer DSP',
        },
      });

      const request = createMockRequest({
        dspEmail: 'nodsp@example.com',
        dspName: 'No Observer DSP',
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(mockAddDsp).toHaveBeenCalledWith(
        'nodsp@example.com',
        'No Observer DSP',
        undefined
      );
    });
  });

  describe('GET /api/dsps - Get all DSPs', () => {
    it('should return all DSPs', async () => {
      mockGetAllDsps.mockResolvedValue({
        success: true,
        message: 'DSPs retrieved successfully',
        data: [
          { id: '1', email: 'dsp1@example.com', name: 'DSP One', createdAt: new Date() },
          { id: '2', email: 'dsp2@example.com', name: 'DSP Two', createdAt: new Date() },
        ],
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(mockGetAllDsps).toHaveBeenCalled();
    });

    it('should return empty array when no DSPs exist', async () => {
      mockGetAllDsps.mockResolvedValue({
        success: true,
        message: 'DSPs retrieved successfully',
        data: [],
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(0);
    });

    it('should handle errors gracefully', async () => {
      mockGetAllDsps.mockResolvedValue({
        success: false,
        message: 'Failed to fetch DSPs',
        error: 'Database error',
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
    });
  });
});

