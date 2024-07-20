import { ICardList } from "@/app/page";

const CardList = ({ detail }: { detail: ICardList }) => {
  return (
    <div className="bg-green-300 rounded-lg h-24 my-5 p-3">
      <div className="flex justify-between">
        <div className="flex">
          {detail?.name !== null && <div className="pr-2">{detail.name} - </div>}
          <div >{detail.countryName} </div>
        </div>

        <div>{detail.type} </div>
      </div>
    </div>
  );
};
export default CardList;
