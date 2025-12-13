import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import FormPage from "@/app/form/observerForm";
import { ACTIVE_USER_KEY } from "@/app/form/userDirectory";
import { fetchAllDsps, addNewDsp } from "@/lib/api";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
  }),
}));

jest.mock("@/lib/api", () => ({
  submitObserverEvaluation: jest.fn(),
  addNewDsp: jest.fn(),
  fetchAllDsps: jest.fn(),
}));

const mockFetchAllDsps = fetchAllDsps as jest.MockedFunction<typeof fetchAllDsps>;
const mockAddNewDsp = addNewDsp as jest.MockedFunction<typeof addNewDsp>;

const observerUser = {
  email: "arjun.mathu2005@gmail.com",
  name: "Arjun",
  role: "observer" as const,
};

describe("ObserverForm Add DSP menu", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(observerUser));
    mockFetchAllDsps.mockResolvedValue({ success: true, data: [] });
    mockAddNewDsp.mockResolvedValue({ success: true, message: "ok" } as any);
  });

  it("adds an existing DSP to the observer list and persists it", async () => {
    const extraDsp = { value: "new-dsp@example.com", label: "New DSP" };

    render(<FormPage dspOptions={[extraDsp]} />);

    await waitFor(() => expect(mockFetchAllDsps).toHaveBeenCalled());

    fireEvent.click(screen.getByRole("button", { name: /add dsp/i }));
    const addButtons = await screen.findAllByRole("button", { name: /^New DSP/i });
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByText("New DSP").length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Currently filling form for/i)).toHaveTextContent("New DSP");
      const storageKey = `observer-dsp-ids:${observerUser.email}`;
      const savedIds = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      expect(savedIds).toContain(extraDsp.value);
    });
  });

  it("shows unassigned DSPs from the system in the Add DSP dropdown", async () => {
    mockFetchAllDsps.mockResolvedValue({
      success: true,
      data: [{ email: "extra@example.com", name: "Extra DSP" }],
    });

    render(<FormPage />);

    await waitFor(() => expect(mockFetchAllDsps).toHaveBeenCalled());

    fireEvent.click(screen.getByRole("button", { name: /add dsp/i }));

    expect(await screen.findByRole("button", { name: /extra dsp/i })).toBeInTheDocument();
  });

  it("creates a brand new DSP and assigns it to the observer list", async () => {
    mockAddNewDsp.mockResolvedValue({
      success: true,
      message: "created",
      data: { dspId: "id-123", email: "brandnew@example.com", name: "Brand New DSP" },
    });

    render(<FormPage />);

    await waitFor(() => expect(mockFetchAllDsps).toHaveBeenCalled());

    fireEvent.click(screen.getByRole("button", { name: /add dsp/i }));
    fireEvent.click(screen.getByRole("button", { name: /create new dsp/i }));

    fireEvent.change(screen.getByPlaceholderText("Enter DSP's full name"), {
      target: { value: "Brand New DSP" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter DSP's email address"), {
      target: { value: "brandnew@example.com" },
    });

    const addButtons = screen.getAllByRole("button", { name: /^add dsp$/i });
    fireEvent.click(addButtons[addButtons.length - 1]);

    await waitFor(() => {
      expect(mockAddNewDsp).toHaveBeenCalledWith(
        "brandnew@example.com",
        "Brand New DSP",
        observerUser.email
      );
      expect(screen.getByText(/currently filling form for/i)).toHaveTextContent("Brand New DSP");
      const storageKey = `observer-dsp-ids:${observerUser.email}`;
      const savedIds = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      expect(savedIds).toContain("brandnew@example.com");
    });
  });

  it("loads previously saved DSP IDs into the available list", async () => {
    const savedKey = `observer-dsp-ids:${observerUser.email}`;
    localStorage.setItem(savedKey, JSON.stringify(["new-dsp@example.com"]));
    const extraDsp = { value: "new-dsp@example.com", label: "New DSP" };

    render(<FormPage dspOptions={[extraDsp]} />);

    await waitFor(() => expect(mockFetchAllDsps).toHaveBeenCalled());

    fireEvent.click(screen.getByRole("button", { name: /click to select dsps/i }));

    expect(await screen.findByLabelText("New DSP")).toBeInTheDocument();
  });
});
