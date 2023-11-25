import {createContext, useContext, useState} from 'react';

const LoginContext = createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export function LoginProvider({children}) {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setIsToken] = useState('');
  const [isLoginPegawai, setIsLoginPegawai] = useState(false);
  const [tokenPegawai, setIsTokenPegawai] = useState('');
  const [tglCheckin, setTglCheckin] = useState(new Date());
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [tglCheckOut, setTglCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState('1');
  const [kids, setKids] = useState('0');
  const [bookingList, setBookingList] = useState([]);

  const handleClick = e => {
    e.preventDefault();
    console.log(total);
  };

  const addToBookingList = room => {
    const index = bookingList.findIndex(
      item => item.jenis_kamar === room.jenis_kamar,
    );

    if (index !== -1) {
      const updatedBookingList = [...bookingList];
      updatedBookingList[index].quantity = room.quantity;
      setBookingList(updatedBookingList);
    } else {
      setBookingList([...bookingList, room]);
    }
  };

  const removeFromBookingList = roomId => {
    const updatedBookingList = bookingList.filter(item => item.id !== roomId);

    setBookingList(updatedBookingList);
  };

  const clearBookingList = () => {
    setBookingList([]);
  };

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        token,
        setIsToken,
        isLoginPegawai,
        setIsLoginPegawai,
        tokenPegawai,
        setIsTokenPegawai,
        tglCheckin,
        setTglCheckin,
        tglCheckOut,
        setTglCheckOut,
        adults,
        setAdults,
        kids,
        setKids,
        handleClick,
        addToBookingList,
        removeFromBookingList,
        clearBookingList,
        bookingList,
        setBookingList
      }}>
      {children}
    </LoginContext.Provider>
  );
}
