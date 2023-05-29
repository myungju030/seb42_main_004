import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NoResultDiv from '../components/commons/NoResultDiv';
import BannerLink from '../components/commons/BannerLink';
import GetTemplate from '../components/commons/GetTemplate';
import PaginationUl from '../components/commons/PaginationUl';
import MealBoxCardLi from '../components/allboxes/MealBoxCardLi';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import useGET from '../util/useGET';
import useFilterSearch from '../util/useFilterSearch';

function AllBoxes() {
  const { admin } = useSelector((state) => state.authReducer);
  const { name } = useSelector((state) => state.userReducer);
  const [toFilterSearchDiv, notFoundWord, paginationUrl, uri] =
    useFilterSearch(true);
  const [res, isPending, error, getData] = useGET(uri);
  const navigate = useNavigate();

  return (
    <GetTemplate
      isPending={isPending}
      error={error}
      res={res?.data}
      title="밀박스 목록 보기"
    >
      <MealBoxesWrapDiv className="margininside">
        {!admin && <BannerLink />}
        <h1>{name && `${name}님 `}오늘도 건강한 하루되세요(｡•̀ᴗ-)✧</h1>
        <FilterSearchDiv
          placeholder="healthy day 밀박스"
          {...toFilterSearchDiv}
        />
        {notFoundWord && (
          <SearchResultH3>
            검색결과 {res?.pageInfo?.totalElements?.toLocaleString('ko-KR')}개
          </SearchResultH3>
        )}
        {res.data?.length === 0 && (
          <NoResultDiv
            search={(word) =>
              navigate(`/mealboxes/search/detail?page=1&name=${word}`)
            }
            notFoundWord={notFoundWord}
            replaceWord={'고단백질 아침 세트'}
          />
        )}
        <MealBoxesUl>
          {((uri.includes('?page=1&') && !uri.includes('search')) ||
            res.data?.length === 0) && <MealBoxCardLi />}
          {res.data?.length !== 0 &&
            res.data?.map((mealbox) => (
              <MealBoxCardLi
                key={mealbox.mealboxId}
                mealBox={mealbox}
                reload={getData}
              />
            ))}
        </MealBoxesUl>
        <PaginationUl
          page={res?.pageInfo?.page}
          totalpage={res?.pageInfo?.totalPages}
          url={paginationUrl}
        />
      </MealBoxesWrapDiv>
    </GetTemplate>
  );
}

export default AllBoxes;

export const MealBoxesWrapDiv = styled.div`
  flex-direction: column;
`;
export const SearchResultH3 = styled.h3`
  margin-bottom: 0.5rem;
`;
export const MealBoxesUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 3rem;
  column-gap: 4vw;
  width: 100%;
  list-style: none;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 2.5rem;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 2rem;
  }
`;
