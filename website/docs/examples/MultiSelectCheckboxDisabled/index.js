import React from "react";
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import cx from "classnames";

import TreeView, { flattenTree } from "react-accessible-treeview";
const folder = {
  name: "",
  children: [
    {
      name: "Fruits",
      children: [
        { name: "Avocados" },
        { name: "Bananas" },
        { name: "Berries" },
        { name: "Oranges" },
        { name: "Pears" }
      ]
    },
    {
      name: "Drinks",
      children: [
        { name: "Apple Juice" },
        { name: "Chocolate" },
        { name: "Coffee" },
        {
          name: "Tea",
          children: [
            { name: "Black Tea" },
            { name: "Green Tea" },
            { name: "Red Tea" },
            { name: "Matcha" }
          ]
        }
      ]
    },
    {
      name: "Vegetables",
      children: [
        { name: "Beets" },
        { name: "Carrots" },
        { name: "Celery" },
        { name: "Lettuce" },
        { name: "Onions" }
      ]
    }
  ]
};

const data = flattenTree(folder);

function MultiSelectCheckboxDisabled() {
  return (
    <div>
      <div className="checkbox">
        <TreeView
          data={data}
          aria-label="Checkbox tree"
          multiSelect
          propagateSelect
          propagateSelectUpwards
          defaultDisabledIds={[1, 5]}
          togglableSelect
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            isSelected,
            isDisabled,
            isHalfSelected,
            getNodeProps,
            level,
            handleSelect,
            handleExpand,
            dispatch
          }) => {
            return (
              <>
                <div
                  {...getNodeProps({ onClick: handleExpand })}
                  style={{
                    marginLeft: 40 * (level - 1),
                    opacity: isDisabled ? 0.5 : 1
                  }}
                >
                  {isBranch && <ArrowIcon isOpen={isExpanded} />}
                  <CheckBoxIcon
                    className="checkbox-icon"
                    onClick={e => {
                      handleSelect(e);
                      e.stopPropagation();
                    }}
                    variant={
                      isHalfSelected ? "some" : isSelected ? "all" : "none"
                    }
                  />
                  <span className="name">{element.name}</span>
                </div>
                <button
                  onClick={() =>
                    dispatch({
                      type: isDisabled ? "ENABLE" : "DISABLE",
                      id: element.id
                    })
                  }
                >
                  {isDisabled ? "Enable" : "Disable"}
                </button>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}

const ArrowIcon = ({ isOpen, className }) => {
  const baseClass = "arrow";
  const classes = cx(
    baseClass,
    { [`${baseClass}--closed`]: !isOpen },
    { [`${baseClass}--open`]: isOpen },
    className
  );
  return <IoMdArrowDropright className={classes} />;
};

const CheckBoxIcon = ({ variant, ...rest }) => {
  switch (variant) {
    case "all":
      return <FaCheckSquare {...rest} />;
    case "none":
      return <FaSquare {...rest} />;
    case "some":
      return <FaMinusSquare {...rest} />;
    default:
      return null;
  }
};

export default MultiSelectCheckboxDisabled;
