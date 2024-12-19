import { OrderActions } from "../ordeReducer.ts/orderReducer";

const tipOptions = [
  {
    id: "tip-10",
    value: 0.1,
    label: "10%",
  },
  {
    id: "tip-20",
    value: 0.2,
    label: "20%",
  },
  {
    id: "tip-50",
    value: 0.5,
    label: "50%",
  },
];

type TipPrecentageFormProps = {
  dispatch: React.Dispatch<OrderActions>;
  tip: number;
};

export default function TipPrecentageForm({
  dispatch,
  tip,
}: TipPrecentageFormProps) {
  return (
    <div>
      <h3 className=" font-black text-2xl">Tip:</h3>
      <form className="">
        {tipOptions.map((tipOption) => (
          <div key={tipOption.id} className="flex gap-2">
            <label htmlFor={tipOption.id}>{tipOption.label}</label>
            <input
              id={tipOption.id}
              type="radio"
              name="tip"
              value={tipOption.value}
              onChange={(e) =>
                dispatch({
                  type: "addTip",
                  payload: { value: +e.target.value },
                })
              }
              checked={tipOption.value === tip}
            />
          </div>
        ))}
      </form>
    </div>
  );
}
