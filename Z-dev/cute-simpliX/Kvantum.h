// Adapted from QuantumStyle (not developed anymore but
// continued as QSvgStyle <https://github.com/DexterMagnific/QSvgStyle>)

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

#ifndef KVANTUM_H
#define KVANTUM_H

#include <QCommonStyle>
#include <QString>
#include <QMap>

#include "shortcuthandler.h"
#include "drag/windowmanager.h"
#include "themeconfig/specs.h"

class QSvgRenderer;
class QSettings;
class QVariant;
class QFont;
class QTimer;
template<typename T> class QList;
template<typename T1, typename T2> class QMap;

class ThemeConfig;

class Kvantum : public QCommonStyle {
  Q_OBJECT

  public:
    /*
       Default constructor. Loads the Kvantum configuration file and
       sets the default and user set themes, among other things.
     */
    Kvantum();
    ~Kvantum();

    /*
       Set the name of the user specific theme.
       If there is no themename, then this style will bypass
       this setting and fallback to the default config.
     */
    void setUserTheme(const QString &themename);
    /*
     * Use the built-in config.
     */
    void setBuiltinDefaultTheme();

    void polish(QWidget *widget);
    void polish(QApplication *app);
    void unpolish(QWidget *widget);
    void unpolish(QApplication *app);

    virtual bool eventFilter(QObject * o, QEvent * e);

    virtual int pixelMetric (PixelMetric metric,
                             const QStyleOption * option = 0,
                             const QWidget * widget = 0) const;
    virtual QRect subElementRect (SubElement element,
                                  const QStyleOption * option,
                                  const QWidget * widget = 0) const;
    virtual QRect subControlRect (ComplexControl control,
                                  const QStyleOptionComplex * option,
                                  SubControl subControl,
                                  const QWidget * widget = 0) const;
    QSize sizeFromContents (ContentsType type,
                            const QStyleOption * option,
                            const QSize & contentsSize,
                            const QWidget * widget = 0) const;

    virtual void drawPrimitive (PrimitiveElement element,
                                const QStyleOption * option,
                                QPainter * painter,
                                const QWidget * widget = 0) const;
    virtual void drawControl (ControlElement element,
                              const QStyleOption * option,
                              QPainter * painter,
                              const QWidget * widget = 0) const;
    virtual void drawComplexControl (ComplexControl control,
                                     const QStyleOptionComplex * option,
                                     QPainter * painter,
                                     const QWidget * widget = 0 ) const;
    virtual int styleHint(StyleHint hint,
                          const QStyleOption * option = 0,
                          const QWidget * widget = 0,
                          QStyleHintReturn * returnData = 0) const;
    virtual SubControl hitTestComplexControl (ComplexControl control,
                                              const QStyleOptionComplex * option,
                                              const QPoint & position,
                                              const QWidget * widget = 0) const;

  protected slots:
    QIcon standardIconImplementation (StandardPixmap standardIcon,
                                      const QStyleOption * option = 0,
                                      const QWidget * widget = 0) const;

  private:
    /* Render the element from the SVG file into the given bounds. */
    bool renderElement(QPainter *painter,
                       const QString &element,
                       const QRect &bounds,
                       int hsize = 0, int vsize = 0,
                       Qt::Orientation orientation = Qt::Horizontal) const;

    /* Return the frame spec of the given widget from the theme config file. */
    inline frame_spec getFrameSpec(const QString &widgetName) const;
    /* Return the interior spec of the given widget from the theme config file. */
    inline interior_spec getInteriorSpec(const QString &widgetName) const;
    /* Return the indicator spec of the given widget from the theme config file. */
    inline indicator_spec getIndicatorSpec(const QString &widgetName) const;
    /* Return the label (text+icon) spec of the given widget from the theme config file. */
    inline label_spec getLabelSpec(const QString &widgetName) const;
    /* Return the size spec of the given widget from the theme config file */
    inline size_spec getSizeSpec(const QString &widgetName) const;

    /* Generic method that draws a frame. */
    void renderFrame(QPainter *painter,
                     const QRect &bounds, // frame bounds
                     const frame_spec &fspec, // frame spec
                     const QString &element, // frame SVG element (basename)
                     int d = 0, // distance of the attached tab from the edge
                     int l = 0, // length of the attached tab
                     int tp = 0) const; // tab position

    /* Generic method that draws an interior. */
    void renderInterior(QPainter *painter,
                        const QRect &bounds, // frame bounds
                        const frame_spec &fspec, // frame spec
                        const interior_spec &ispec, // interior spec
                        const QString &element, // interior SVG element
                        Qt::Orientation orientation = Qt::Vertical) const;

    /* Generic method that draws an indicator. */
    void renderIndicator(QPainter *painter,
                         const QRect &bounds, // frame bounds
                         const frame_spec &fspec, // frame spec
                         const indicator_spec &dspec, // indicator spec
                         const QString &element, // indicator SVG element
                         Qt::Alignment alignment = Qt::AlignCenter) const;

    /* Generic method that draws a label (text and/or icon) inside the frame. */
    void renderLabel(
                     QPainter *painter,
                     const QPalette &palette,
                     const QRect &bounds, // frame bounds
                     const frame_spec &fspec, // frame spec
                     const label_spec &lspec, // label spec
                     int talign, // text alignment
                     const QString &text,
                     QPalette::ColorRole textRole, // text color role
                     bool enabled = true, // is text enabled ?
                     const QPixmap &icon = 0,
                     const Qt::ToolButtonStyle tialign = Qt::ToolButtonTextBesideIcon // relative positions of text and icon
                    ) const;

    /* Generic method to compute the ideal size of a widget. */
    QSize sizeCalculated(const QFont &font, // font to determine width/height
                         const frame_spec &fspec,
                         const label_spec &lspec,
                         const size_spec &sspec,
                         const QString &text,
                         const QPixmap &icon,
                         // text-icon alignment
                         const Qt::ToolButtonStyle tialign = Qt::ToolButtonTextBesideIcon) const;

    /* Compute width and height of widget text. */
    QSize textSize (const QFont &font, const QString &text) const;

    /* Return a normalized rect, i.e. a square. */
    QRect squaredRect(const QRect &r) const;

    /* Return a QRect for the given frame without margins. */
    QRect interiorRect(const QRect &bounds, frame_spec f) const {
      return bounds.adjusted(f.left,f.top,-f.right,-f.bottom);
    }
    /* Return a QRect for the given frame and text specs. */
    QRect labelRect(const QRect &bounds, frame_spec f,label_spec t) const {
      return interiorRect(bounds,f).adjusted(t.left,t.top,-t.right,-t.bottom);
    }

  private slots:
    /* Slot called on timer timeout to advance busy progress bars. */
    void advanceProgresses();

  private:
    QSvgRenderer *defaultRndr, *themeRndr;
    ThemeConfig *defaultSettings, *themeSettings, *settings;
    QSettings *globalSettings;

    QString xdg_config_home;

    QTimer *progresstimer;

    /* List of busy progress bars. */
    QMap<QWidget *,int> progressbars;

    ShortcutHandler *itsShortcutHandler;
    WindowManager *itsWindowManager;

    /* To be called to cumpute theme dependencies. */
    void setupThemeDeps();

    /* LibreOffice and Plasma need workarounds. */
    bool isLibreoffice;
    bool isPlasma;
};

#endif
