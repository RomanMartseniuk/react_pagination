import React, { useState } from 'react';
import classNames from 'classnames';
import './App.css';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [numOfItems, setNumOfItems] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = Math.ceil(items.length / numOfItems);

  const turnPage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const target = e.target as HTMLAnchorElement;

    setCurrentPage(Number(target.innerText));
  };

  if (currentPage > numOfPages) {
    setCurrentPage(numOfPages);
  }

  const turnPageLeft = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (currentPage - 1 >= 1) {
      setCurrentPage(currentPage - 1);

      return;
    }

    setCurrentPage(numOfPages);
  };

  const calcFirstItemOnPage = () => {
    return numOfItems * (currentPage - 1);
  };

  const calcLastItemOnPage = () => {
    return numOfItems * currentPage;
  };

  const turnPageRight = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (currentPage + 1 <= numOfPages) {
      setCurrentPage(currentPage + 1);

      return;
    }

    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {calcFirstItemOnPage() + 1} -{' '}
        {calcLastItemOnPage()} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={numOfItems}
            onChange={e => setNumOfItems(parseInt(e.target.value))}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <ul className="pagination">
        <li className="page-item">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={e => turnPageLeft(e)}
          >
            «
          </a>
        </li>
        {Array.from({ length: numOfPages }, (_, i) => (
          <li
            className={classNames('page-item', {
              active: i + 1 === currentPage,
            })}
            key={i + 1}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={e => turnPage(e)}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={e => turnPageRight(e)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items
          .slice(calcFirstItemOnPage(), calcLastItemOnPage())
          .map((item, index) => {
            return (
              <li key={index} data-cy="item">
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default App;
