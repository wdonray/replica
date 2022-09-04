import { ceil } from 'lodash';

// Monthly Interest Rate Calculation
export function ConvertAPRToMonthlyPayment(apr: number, balance: number, maximumFractionDigits = 2) {
  const numberNf = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits });
  const percentageNf = Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits });

  const aprDecimal = apr / 100;

  const monthlyInterestRate = aprDecimal / 12;

  const monthlyPayment = numberNf.format(monthlyInterestRate * balance);

  const monthlyInterestRatePercentage = percentageNf.format(monthlyInterestRate);

  return { monthlyPayment, monthlyInterestRatePercentage };
}

const InputFail = (message: string) => ({ valid: false, message });
const InputPass = () => ({ valid: true, message: '' });

export function InputValidation(field: number, type: 'apr' | 'balance' | 'payment', totalBalance?: number) {
  const parsedField = parseFloat(field.toString());
  const parsedBalance = totalBalance ? parseFloat(totalBalance.toString()) : 0;
  const stringField = field.toString();

  if (parsedField < 0) {
    return InputFail('Value must at least be 0');
  } else if (isNaN(parsedField)) {
    return InputFail('Must be a number');
  } else if (field.toString().toLowerCase().includes('e')) {
    return InputFail('Invalid Input');
  } else if (stringField.length > 1 && stringField.charAt(0) === '0' && stringField.charAt(1) !== '.') {
    return InputFail('Invalid Input');
  }

  switch (type) {
    case 'apr': {
      if (parsedField > 100) {
        return InputFail('Over 100% APR?!?');
      }

      break;
    }

    case 'payment': {
      if (parsedField > parsedBalance) {
        return InputFail('Payment cannot be greater than balance');
      }

      break;
    }

    case 'balance': {
      if (parsedField <= 0) {
        return InputFail('Balance cannot be less than 1');
      }

      break;
    }

    default: {
      break;
    }
  }

  return InputPass();
}

export function ConvertToCurrency(num: number, step = 2) {
  return ceil(num, step);
}

export function FormatFields<Type>(fields: Type, type: 'string' | 'number'): Type {
  let updatedFields = fields;

  for (const key in updatedFields) {
    const n = Number(updatedFields[key]);
    const step = key === 'apr' ? 3 : 2;

    updatedFields = { ...updatedFields, [key]: type === 'string' ? n.toFixed(step) : ConvertToCurrency(n, step) };
  }

  return updatedFields;
}