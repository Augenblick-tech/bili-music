import { ConfigProvider, Table, TableProps } from "antd"
import type { AnyObject } from "antd/es/_util/type"

type MusicListTableProps<T> = Pick<
  TableProps<T>,
  "className" | "dataSource" | "rowKey" | "size" | "tableLayout" | "children" | "onRow"
>

const MusicListTable = <T extends AnyObject>({
  className,
  dataSource,
  rowKey,
  size = "middle",
  tableLayout,
  children,
  onRow,
}: MusicListTableProps<T>) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            borderColor: "transparent",
            footerBg: "transparent",
            headerBg: "transparent",
            rowHoverBg: "white",
          },
        },
      }}
    >
      <Table<T>
        dataSource={dataSource}
        rowKey={rowKey}
        size={size}
        pagination={false}
        onRow={onRow}
        tableLayout={tableLayout}
        rowClassName="table-row"
        className={`
        ${className ?? ""}
          select-none
          [&_.ant-table]:bg-transparent
          [&_.table-row]:overflow-hidden
          [&_.table-row_td:first-child]:[border-top-left-radius:10px] [&_.table-row_td:first-child]:[border-bottom-left-radius:10px]
          [&_.table-row_td:last-child]:[border-top-right-radius:10px] [&_.table-row_td:last-child]:[border-bottom-right-radius:10px]
          [&_.table-row:hover]:rounded-md [&_.table-row:hover]:shadow-lg
          [&_.table-row:hover_.cover]:block [&_.table-row:hover_.cover]:bg-[rgba(107,114,128,0.5)]
        `}
      >
        {children}
      </Table>
    </ConfigProvider>
  )
}

export default MusicListTable
