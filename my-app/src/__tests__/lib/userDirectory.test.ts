/**
 * Tests for userDirectory.ts
 * 
 * Tests observer's ability to switch between DSPs and user lookup functionality.
 */

import {
  findUserByEmail,
  getDspOptionsForObserver,
  USER_DIRECTORY,
  DSP_DIRECTORY,
  type DspOption,
} from '@/app/form/userDirectory';

describe('Observer DSP Switching', () => {
  describe('getDspOptionsForObserver', () => {
    it('should return multiple DSP options for an observer', () => {
      const observerEmail = 'arjun.mathu2005@gmail.com';
      const dspOptions = getDspOptionsForObserver(observerEmail);
      
      expect(dspOptions.length).toBeGreaterThan(1);
      expect(dspOptions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ value: 'john-steven', label: 'John Steven' }),
          expect.objectContaining({ value: 'eduardo-lopez', label: 'Eduardo Lopez' }),
        ])
      );
    });

    it('should allow observer to switch between different DSPs', () => {
      const observerEmail = 'arjun.mathu2005@gmail.com';
      const dspOptions = getDspOptionsForObserver(observerEmail);
      
      // Observer should be able to select any DSP from the list
      const firstDsp = dspOptions[0];
      const secondDsp = dspOptions[1];
      
      expect(firstDsp).toBeDefined();
      expect(secondDsp).toBeDefined();
      expect(firstDsp.value).not.toEqual(secondDsp.value);
      
      // Both DSPs should have valid labels for display
      expect(firstDsp.label).toBeTruthy();
      expect(secondDsp.label).toBeTruthy();
    });

    it('should return empty array for non-observer users', () => {
      const dspEmail = 'j1212steven@gmail.com';
      const dspOptions = getDspOptionsForObserver(dspEmail);
      
      expect(dspOptions).toEqual([]);
    });

    it('should return empty array for unknown email', () => {
      const unknownEmail = 'unknown@example.com';
      const dspOptions = getDspOptionsForObserver(unknownEmail);
      
      expect(dspOptions).toEqual([]);
    });

    it('should return empty array for null/undefined email', () => {
      expect(getDspOptionsForObserver(null)).toEqual([]);
      expect(getDspOptionsForObserver(undefined)).toEqual([]);
      expect(getDspOptionsForObserver('')).toEqual([]);
    });

    it('should return DSP options that exist in DSP_DIRECTORY', () => {
      const observerEmail = 'arjun.mathu2005@gmail.com';
      const dspOptions = getDspOptionsForObserver(observerEmail);
      
      // Every returned option should exist in the DSP_DIRECTORY
      dspOptions.forEach((option: DspOption) => {
        expect(DSP_DIRECTORY[option.value]).toBeDefined();
        expect(DSP_DIRECTORY[option.value].label).toBe(option.label);
      });
    });
  });

  describe('findUserByEmail', () => {
    it('should find observer user by email', () => {
      const user = findUserByEmail('arjun.mathu2005@gmail.com');
      
      expect(user).toBeDefined();
      expect(user?.role).toBe('observer');
      expect(user?.name).toBe('Arjun Mathu');
      expect(user?.dspIds).toContain('john-steven');
    });

    it('should find DSP user by email', () => {
      const user = findUserByEmail('j1212steven@gmail.com');
      
      expect(user).toBeDefined();
      expect(user?.role).toBe('dsp');
      expect(user?.name).toBe('John Steven');
      expect(user?.dspId).toBe('john-steven');
    });

    it('should be case-insensitive', () => {
      const lowerCase = findUserByEmail('arjun.mathu2005@gmail.com');
      const upperCase = findUserByEmail('ARJUN.MATHU2005@GMAIL.COM');
      
      expect(lowerCase).toEqual(upperCase);
    });

    it('should return null for unknown email', () => {
      const user = findUserByEmail('unknown@example.com');
      expect(user).toBeNull();
    });

    it('should return null for null/undefined email', () => {
      expect(findUserByEmail(null)).toBeNull();
      expect(findUserByEmail(undefined)).toBeNull();
    });
  });

  describe('Observer has correct DSP assignments', () => {
    it('should have observer with multiple DSPs to evaluate', () => {
      const observer = USER_DIRECTORY['arjun.mathu2005@gmail.com'];
      
      expect(observer).toBeDefined();
      expect(observer.role).toBe('observer');
      expect(observer.dspIds).toBeDefined();
      expect(observer.dspIds!.length).toBeGreaterThanOrEqual(2);
    });

    it('should have DSPs linked back to observer', () => {
      const observer = USER_DIRECTORY['arjun.mathu2005@gmail.com'];
      const dspIds = observer.dspIds!;
      
      // Each DSP should have this observer as their observerEmail
      dspIds.forEach((dspId) => {
        const dsp = DSP_DIRECTORY[dspId];
        expect(dsp).toBeDefined();
        expect(dsp.observerEmail).toBe('arjun.mathu2005@gmail.com');
      });
    });

    it('should have all DSP options with required fields for UI display', () => {
      const observerEmail = 'arjun.mathu2005@gmail.com';
      const dspOptions = getDspOptionsForObserver(observerEmail);
      
      dspOptions.forEach((option: DspOption) => {
        // value is used for form selection
        expect(option.value).toBeTruthy();
        expect(typeof option.value).toBe('string');
        
        // label is displayed to the user
        expect(option.label).toBeTruthy();
        expect(typeof option.label).toBe('string');
      });
    });
  });

  describe('Switching DSPs maintains form data isolation', () => {
    it('should have unique DSP IDs for each DSP option', () => {
      const observerEmail = 'arjun.mathu2005@gmail.com';
      const dspOptions = getDspOptionsForObserver(observerEmail);
      
      const values = dspOptions.map((opt: DspOption) => opt.value);
      const uniqueValues = [...new Set(values)];
      
      // All values should be unique (no duplicates)
      expect(values.length).toBe(uniqueValues.length);
    });

    it('should have different emails for different DSPs', () => {
      const dsp1 = DSP_DIRECTORY['john-steven'];
      const dsp2 = DSP_DIRECTORY['eduardo-lopez'];
      
      expect(dsp1.email).toBeDefined();
      expect(dsp2.email).toBeDefined();
      expect(dsp1.email).not.toBe(dsp2.email);
    });
  });
});

