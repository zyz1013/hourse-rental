/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import { DatePicker, Select, Space } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useEffect, useState } from 'react';

export interface MeetingTimePickerProps {
  value?: [string, string];
  onChange?: (value: [string, string]) => void;
  format?: string;
}

type Type = 'start' | 'end';

/**
 * 获取时分半刻钟列表 默认48等分 2n为整点  2n+1为整点半刻钟
 * @returns
 */
function getOptions() {
  const defaultOptions = [];
  for (let i = 0; i <= 23; i++) {
    const hour = i < 10 ? `0${i}` : i;
    defaultOptions.push(
      ...[
        {
          label: `${hour}:00`,
          value: i * 2,
        },
        {
          label: `${hour}:30`,
          value: i * 2 + 1,
        },
      ],
    );
  }
  return defaultOptions;
}

const MeetingTimePicker: React.FC<MeetingTimePickerProps> = (props) => {
  const { value, onChange, format = 'YYYY-MM-DD' } = props;
  const options = getOptions();
  const [stateStartDate, setStartDate] = useState<Moment | null>(moment());
  const [stateEndDate, setEndDate] = useState<Moment | null>(moment());
  const [stateStartIndex, setStartIndex] = useState<number>(0);
  const [stateEndIndex, setEndIndex] = useState<number>(0);

  useEffect(() => {
    const start = value ? moment(value[0]) : moment();
    const end = value ? moment(value[1]) : moment();
    const hour = start.hour();
    const minute = end.minute();
    const index = minute >= 30 ? hour * 2 + 1 : hour * 2;
    setStartIndex(index);
    const startTime = getFormatTime(start, index);
    let endTime;
    // 默认结束时间比开始时间多30分钟
    // 超过23:30分 则结束时间设置为第二天的00:00,
    if (hour === 23 && minute >= 30) {
      setEndIndex(0);
      setEndDate(start.add(1, 'days'));
      endTime = getFormatTime(start.add(1, 'days'), 0);
    } else {
      setEndIndex(index + 1);
      endTime = getFormatTime(end, index + 1);
    }
    if (onChange) {
      onChange([startTime, endTime]);
    }
  }, []);

  /**
   * 改变时间后的事件(年月)
   */
  function handleOnMonthChange(type: Type, val: Moment | null) {
    let startTime = moment().format(format);
    let endTime = moment().format(format);
    if (type === 'start') {
      setStartDate(val);
      startTime = getFormatTime(val, stateStartIndex);
    }
    setEndDate(val);
    endTime = getFormatTime(val, stateEndIndex);
    if (onChange) {
      onChange([startTime, endTime]);
    }
  }

  /**
   * 改变时间后的事件(时分)
   */
  function handleOnHourChange(type: Type, val: number) {
    let startTime = moment().format(format);
    let endTime = moment().format(format);
    if (type === 'start') {
      setStartIndex(val);
      startTime = getFormatTime(stateStartDate, val);
      endTime = getFormatTime(stateEndDate, stateEndIndex);
    } else {
      setEndIndex(val);
      startTime = getFormatTime(stateStartDate, stateStartIndex);
      endTime = getFormatTime(stateEndDate, val);
    }
    if (onChange) {
      onChange([startTime, endTime]);
    }
  }

  function disabledStartDate(current: Moment) {
    return current && current < moment().startOf('day');
  }

  function disabledEndDate(current: Moment) {
    const stateDate = stateStartDate ?? moment();
    return current && current < stateDate;
  }

  /**
   * 获取格式化后的时间YYYY-MM-DD HH:MM
   * @param date
   * @param index
   * @returns
   */
  function getFormatTime(date: Moment | null, index: number) {
    return `${(date ?? moment()).format(format)} ${options[index].label}`;
  }

  return (
    <div>
      <Space direction="vertical" size={20}>
        <Space direction="vertical">
          <label>开始时间</label>
          <Space size={30}>
            <DatePicker
              allowClear={false}
              value={stateStartDate}
              disabledDate={disabledStartDate}
              onChange={(val) => handleOnMonthChange('start', val)}
            />
            <Select
              options={options}
              value={stateStartIndex}
              style={{ width: 120 }}
              onChange={(val) => handleOnHourChange('start', val)}
            />
          </Space>
        </Space>
        <Space direction="vertical">
          <label>结束时间</label>
          <Space size={30}>
            <DatePicker
              allowClear={false}
              value={stateEndDate}
              disabledDate={disabledEndDate}
              onChange={(val) => handleOnMonthChange('end', val)}
            />
            <Select
              options={options}
              value={stateEndIndex}
              style={{ width: 120 }}
              onChange={(val) => handleOnHourChange('end', val)}
            />
          </Space>
        </Space>
      </Space>
    </div>
  );
};

export default MeetingTimePicker;
