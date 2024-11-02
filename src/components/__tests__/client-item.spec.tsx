import { render, act, fireEvent } from "test-utils";
import { ClientItem } from "../client-item";
import {
  clientItemMock,
  clientsItemStorageMock,
} from "../__mocks__/client-item.mock";
import { formatCurrency } from "../../lib/utils";
import {
  useClientListStorage,
  useGetClients,
  useRemoveClient,
  useCreateClient,
  useUpdateClient,
} from "../../hooks/useTeddyQueryAPI";

const renderComponent = () => render(<ClientItem item={clientItemMock} />);

describe("Client Item", () => {
  beforeAll(() => {
    (useGetClients as jest.Mock).mockImplementation(() => ({
      data: clientsItemStorageMock,
      isLoading: false,
      isError: false,
      isPending: false,
      isSuccess: true,
      error: null,
      getClientListStorage: jest.fn(),
    }));

    (useClientListStorage as jest.Mock).mockResolvedValue(() => ({
      data: clientsItemStorageMock.clients,
      refetch: jest.fn(),
    }));

    (useRemoveClient as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));

    (useCreateClient as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));

    (useUpdateClient as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should render modal remove client", async () => {
    const { getByTestId, queryByTestId } = renderComponent();

    const buttonRemove = getByTestId("button-remove");

    expect(queryByTestId("modal-remove-client")).toBeNull();

    await act(() => fireEvent.press(buttonRemove));

    expect(queryByTestId("modal-remove-client")).toBeVisible();
  });

  it("should render modal edit user", async () => {
    const { getByTestId, queryByTestId } = renderComponent();

    const buttonEdit = getByTestId("button-edit");

    expect(queryByTestId("modal-edit-client")).toBeNull();

    await act(() => fireEvent.press(buttonEdit));

    expect(queryByTestId("modal-edit-client")).toBeVisible();
  });

  it("should show values in the fields for editing", async () => {
    const { getByTestId, queryByTestId } = renderComponent();

    const buttonEdit = getByTestId("button-edit");

    await act(() => fireEvent.press(buttonEdit));

    const name = queryByTestId("name");
    const salary = queryByTestId("salary");
    const companyValuation = queryByTestId("companyValuation");

    expect(name?.props.value).toBe(clientItemMock.name);
    expect(salary?.props.value).toBe(
      formatCurrency(String(clientItemMock.salary))
    );
    expect(companyValuation?.props.value).toBe(
      formatCurrency(String(clientItemMock.companyValuation))
    );
  });

  it("should change check status of the checkbox when it be clicked", async () => {
    const { findByTestId, queryByTestId, getByTestId, debug } =
      renderComponent();

    const checkbox = getByTestId("check-box");

    fireEvent.press(checkbox);

    // const itemChecked = queryByTestId("unchecked");

    // console.log(itemChecked);

    // expect(itemChecked).toBeVisible();
  });
});
