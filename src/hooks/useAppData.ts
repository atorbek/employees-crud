import {actions} from 'reducers/employeeSlice';
import {State} from 'types';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

export default function useAppData () {
  const dispatch = useDispatch();
  const {employees} = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(actions.initializeEmployee());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return employees;
}
