/*
 * Copyright (C) Pedram Pourang (aka Tsu Jan) 2014 <tsujan2000@gmail.com>
 * 
 * Kvantum is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Kvantum is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

#ifndef THEMECONFIG_H
#define THEMECONFIG_H

#include "themeconfig/specs.h"

class QString;
class QVariant;
class QSettings;

/*
   Class that loads theme settings.
 */
class ThemeConfig {
  public:
    ThemeConfig(const QString &theme);
    ~ThemeConfig();

    /*
       Loads a configuration from the filename of the given theme.
     */
    void load(const QString &theme);

    /*
       Sets the parent configuration of this theme config.
       If a key isn't found in the current config at all,
       its parent will be searched for it.
     */
    void setParent(ThemeConfig *parent) {parentConfig = parent;};

    /* Returns the frame spec of the given widget. */
    frame_spec getFrameSpec(const QString &elementName) const;
    /* Returns the interior spec of the given widget. */
    interior_spec getInteriorSpec(const QString &elementName) const;
    /* Returns the indicator spec of the given widget. */
    indicator_spec getIndicatorSpec(const QString &elementName) const;
    /* Returns the label (text+icon) spec of the given widget. */
    label_spec getLabelSpec(const QString &elementName) const;
    /* Returns the size spec of the given widget. */
    size_spec getSizeSpec(const QString &elementName) const;
    /* Returns the theme spec of this theme. */
    theme_spec getThemeSpec() const;

    /* returns the list of supported elements for which settings are recognized */
    //static QStringList getManagedElements();

  private:
    /*
       Returns the value of the given key belonging to the given group.
       If the key is not found in the given group, the group of the
       "inherits" string will be searched for it. If the key is not
       found in it either and it also inherits from another group,
       the latter will be searched, and so forth. This method is
       protected from infinite loops.
     */
    QVariant getValue(const QString &group, const QString& key, const QString &inherits) const;
    /*
       Returns the value of the given key belonging to the given group
       from the theme config file.
     */
    QVariant getValue(const QString &group, const QString& key) const;

    QSettings *settings;
    ThemeConfig *parentConfig;
};

#endif // THEMECONFIG_H
