/*
 * Copyright (C) 2020 Graylog, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Server Side Public License, version 1,
 * as published by MongoDB, Inc.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Server Side Public License for more details.
 *
 * You should have received a copy of the Server Side Public License
 * along with this program. If not, see
 * <http://www.mongodb.com/licensing/server-side-public-license>.
 */
import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useStore } from 'stores/connect';
import { WidgetStore } from 'views/stores/WidgetStore';
import WidgetFocusContext from 'views/components/contexts/WidgetFocusContext';

const WidgetFocusProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [focusedWidget, setFocusedWidget] = useState(undefined);
  const widgets = useStore(WidgetStore);

  useEffect(() => {
    if (focusedWidget && !widgets.has(focusedWidget)) {
      setFocusedWidget(undefined);
    }
  }, [focusedWidget, widgets]);

  const updateFocus = (widgetId: string | undefined | null) => (
    widgetId === focusedWidget
      ? setFocusedWidget(undefined)
      : setFocusedWidget(widgetId));

  return (
    <WidgetFocusContext.Provider value={{ focusedWidget, setFocusedWidget: updateFocus }}>
      {children}
    </WidgetFocusContext.Provider>
  );
};

WidgetFocusProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WidgetFocusProvider;
