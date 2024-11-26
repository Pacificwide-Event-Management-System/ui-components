import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import clsx from 'clsx';

type Props = {
  className?: string;
  menu?: MenuProps['items'];
};

const OptionDropdown = (props: Props) => (
  <Dropdown
    menu={{ items: props.menu }}
    trigger={['click']}
    placement="bottomRight"
    overlayClassName="[&_.ant-dropdown-menu-submenu-title]:!flex [&_.ant-dropdown-menu-submenu-title]:!w-[204px] [&_.ant-dropdown-menu-sub]: [&_.ant-dropdown-menu-item-active]:!font-semibold"
  >
    <button
      type="button"
      className={clsx(
        'group absolute right-4 top-4 flex size-[36px] cursor-pointer items-center justify-center rounded-[50%] border border-transparent bg-white hover:!border-primary-3',
        props.className,
      )}
    >
      <ul>
        <li className="size-1 rounded-full bg-neutral-4 group-hover:bg-primary-3"></li>
        <li className="mt-1 size-1 rounded-full bg-neutral-4 group-hover:bg-primary-3"></li>
        <li className="mt-1 size-1 rounded-full bg-neutral-4 group-hover:bg-primary-3"></li>
      </ul>
    </button>
  </Dropdown>
);

export default OptionDropdown;
