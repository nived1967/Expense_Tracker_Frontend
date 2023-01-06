import {Routes,Route} from 'react-router-dom';
import {Register} from './routes/registration/registration.component.jsx';
import {Login} from './routes/login/login.component.jsx';
import './App.css';
import {Home} from './routes/home/home.component.jsx';
import {ExpenseType} from './components/expense_type/expense_type.component.jsx'
import {Navigation} from './routes/navigation/navigation.component.jsx';
import {Income} from './components/income/income.component.jsx';
import {ExpectedExpenses} from './components/expected_expenses/expected_expenses.component.jsx';
import {Expense} from './components/expenses/expenses.component.jsx';

const App = () =>  {
  return (
    <Routes>
    <Route path='/' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/nav' element={<Navigation/>}>
      <Route path='/nav/home' element={<Home/>}/>
      <Route path='/nav/expense_type' element={<ExpenseType/>}/>
      <Route path='/nav/expense' element={<Expense/>}/>
      <Route path='/nav/expected_expense' element={<ExpectedExpenses/>}/>
      <Route path='/nav/income' element={<Income/>}/>
    </Route>
    </Routes>
  );
}

export default App;