import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

const AddWorker = (props) => {
   const [enteredWorkerName, setEnteredWorkerName] = useState("");
   const [enteredWage, setEnteredWage] = useState("");
   const [error, setError] = useState();

   const minimumWage = 5000;
   const addWorkerHandler = (e) => {
      e.preventDefault();
      if (enteredWorkerName.trim().length === 0) {
         setError({
            title: "İsim Alanı Zorunludur.",
            message: "Lütfen bir isim giriniz",
         });
         return;
      }

      if (+enteredWage < minimumWage) {
         setError({
            title: "Maaş alanı zorunludur",
            message: `Lütfen ${minimumWage} değerinden büyük bir maaş değeri giriniz`,
         });
         return;
      }

      props.setWorkers((prevState) => [
         {
            id: Math.floor(Math.random() * 1000),
            name: enteredWorkerName,
            wage: enteredWage,
         },
         ...prevState,
      ]);
      setEnteredWorkerName("");
      setEnteredWage("");
   };
   const errorHandler = () => {
      setError(null);
   };

   return (
      <div>
         {error && <ErrorModal onConfirm={errorHandler} error={error} />}
         <Card className="mt-10">
            <form className="flex flex-col gap-y-2" onSubmit={addWorkerHandler}>
               <label htmlFor="name" className="font-medium">
                  Çalışan İsmi
               </label>
               <input
                  type="text"
                  className="max-w-[40rem] w-full mx-auto border p-2"
                  placeholder="Çalışan ismi Yazınız"
                  id="name"
                  onChange={(e) => setEnteredWorkerName(e.target.value)}
                  value={enteredWorkerName}
               />
               <label htmlFor="wage" className="font-medium">
                  Maaş Miktarı Yazınız
               </label>
               <input
                  type="number"
                  className="max-w-[40rem] w-full mx-auto border p-2"
                  placeholder="Maaş miktarı yazınız"
                  id="wage"
                  onChange={(e) => setEnteredWage(e.target.value)}
                  value={enteredWage}
               />
               <Button type="submit" className="mt-3">
                  Ekle
               </Button>
            </form>
         </Card>
      </div>
   );
};

export default AddWorker;
