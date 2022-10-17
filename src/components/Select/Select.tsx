import ReactSelect, { Props } from "react-select";
import * as S from "./Select.styles";

export type SelectOption<T = unknown> = {
  label: string;
  value: T;
};

type SelectProps = Props & {
  name: string;
  options: SelectOption[];
};

function Select({ name, options, ...rest }: SelectProps) {
  const styles = S.getObjectStyle();

  return (
    <S.SelectContainer>
      <ReactSelect
        options={options}
        instanceId={name}
        styles={styles}
        {...rest}
      />
    </S.SelectContainer>
  );
}

export default Select;
