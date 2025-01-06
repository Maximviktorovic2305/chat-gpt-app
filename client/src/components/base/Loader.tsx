const Loader = () => {
   return (
     <div className="flex items-center justify-center h-full">
       <div className="loader"></div>
       <style jsx>{`
         .loader {
           border: 3px solid rgba(124, 169, 191, 0.5); /* Цвет внешнего круга */
           border-left-color: rgba(124, 169, 191); /* Цвет внутреннего круга */
           border-radius: 50%;
           width: 20px; /* Ширина и высота лоадера */
           height: 20px;
           animation: spin 1s infinite linear; /* Анимация лоадера */
         }
 
         @keyframes spin {
           to {
             transform: rotate(360deg); /* Вращение на 360 градусов */
           }
         }
       `}</style>
     </div>
   );
 };
 
 export default Loader;
 