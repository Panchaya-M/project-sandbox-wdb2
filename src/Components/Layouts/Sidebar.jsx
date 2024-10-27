import React, { useEffect, useRef, useState } from "react";
import ArrowRight from "../../assets/arrow_right.svg";
import ArrowLeft from "../../assets/arrow_left.svg";
import {getAllCategory} from '../../api';
import {Link} from 'react-router-dom';


const fixedMenu = [
  { name: 'Home', permalink: '/', isFixed: true }
]


function Sidebar({ isOpen, setIsOpen }) {

  const cachedItemsRef = useRef([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const [isCategoryFetched, setIsCategoryFetched] = useState(false)
  const [fetchedCategories, setFetchedCategories] = useState([])
  const [parentMenuItem, setParentMenuItem] = useState(null)
  const [previousPage, setPreviousPage] = useState(null)

  useEffect(() => {
    _getAllCategory()
  }, [])

  useEffect(() => {
    categorizeMenu()
  }, [fetchedCategories])
  
  function categorizeMenu() {
    setParentMenuItem(null)
    setPreviousPage(null)
    if (!isCategoryFetched)
      return

    let _menu = {}

    fetchedCategories.forEach((item) => {
      // If the item is a parent
      if (item.parentId === null) {
        // Add the item to the menu
        _menu[item.id] = {
          ...item,
          ..._menu[item.id],
          children: []
        }
        // If the item is a child
      } else {
        if (!_menu[item.parentId]) {
          _menu[item.parentId] = {
            children: [],
          }
        }
        // Add the item to the parent's children
        _menu[item.parentId].children.push({...item, permalink: `/products/${item.permalink}`,})
      }
    })

    const _menuItems = [...fixedMenu, ...Object.values(_menu)]
    setMenuItems(_menuItems)
    cachedItemsRef.current = _menuItems
  }

  async function _getAllCategory() {
    const categories = await getAllCategory()

    setFetchedCategories(categories)
    setIsCategoryFetched(true)
  }

  function listMenuItem() {
    function renderContent(item) {
      return (
        <>
          <span>{item.name}</span>
          { item.children && item.children.length > 0 && <img src={ArrowRight} alt="arrow-right" className="w-10 h-10" /> }
        </>
      )
    }


    return menuItems.map((item) => {
      return (
        <li key={`sidebar-item-${item.id}`} className="min-h-10">

          {/* If the item is not a fixed menu */}
          
          {
            item.children && item.children.length > 0 ? (
              <button className="block w-full flex items-center justify-between" onClick={() => onSelect(item)}>
                {renderContent(item)}
              </button>
            ) : (
              <Link to={item.permalink} className="flex items-center justify-between" onClick={() => setIsOpen(false)} >
                {renderContent(item)}
              </Link>
            )
          }


        </li>
      )
    })
  }

  function getNextPage(item) {
    // If the item is null, go back to the parent
    if (item === null && previousPage !== null) {
      setMenuItems(previousPage)

      // It should not be null
      // we need to store the history of the previous page
      setParentMenuItem(null)
      return
    }

    let _selectedMenu = item.children

    setParentMenuItem(item)
    setPreviousPage(menuItems)
    setMenuItems(_selectedMenu)
  }

  function onSelect(item) {
    if (item === null) {
      getNextPage(null)
    }else if ((item !== null && item.children && item.children.length > 0)) {
      getNextPage(item)
    }

    // setIsOpen(false)
  }

  function renderTitleBar() {
    return (
      <div className="my-4">
        {/* Title */}
        <div className="px-4 py-2 flex justify-start items-center gap-x-6 border-b border-b-300">
          {/* Arrow left */}
          <div className="">
            <button className="block" onClick={() => onSelect(null)}>
              <img src={ArrowLeft} alt="arrow-left" className="w-10 h-10" />
            </button>
          </div>

          <p className="text-xl font-bold">
            {parentMenuItem.name}
          </p>
        </div>
      </div>
    )
  }

  if (!isOpen) return

  return (
    <div
      className="bg-black/50 fixed top-0 left-0 right-0 bottom-0 z-30 flex md:hidden"
      onClick={() => setIsOpen(false)}
    >

      {/* Sidebar */}
      <aside className="bg-white min-w-[86%] h-full shadow-lg rounded-r-xl z-40" onClick={e => e.stopPropagation()}>
        { parentMenuItem !== null && renderTitleBar()}

        <div className="">
          { !isCategoryFetched && <p className="mx-8 my-4">Loading...</p> }
          <ul className="my-5 text-lg px-8">
            {listMenuItem()}
          </ul>
        </div>
      </aside>
      
    </div>
  );
}

export default Sidebar;
