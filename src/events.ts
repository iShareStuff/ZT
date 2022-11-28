/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: ShareStuff
 * @Date: 2022-11-26 21:42:23
 * @LastEditors: isharestuff
 * @LastEditTime: 2022-11-28 23:19:33
 */
import { Addon, addonName } from "./addon";
import AddonModule from "./module";

/* 
Add init action in this file
 */

class AddonEvents extends AddonModule {
  constructor(parent: Addon) {
    super(parent);
  }

  public onInit(_Zotero) {
    // This function is the setup code of the addon
    console.log(`${addonName}: init called`);
    _Zotero.debug(`${addonName}: init called`);

    // Reset prefs
    this.resetState();

    this._Addon.views.initViews(_Zotero);
  }

  private resetState(): void {
    const initPrefs = {
      "tara.keepAddon": true,
      "tara.keepPrefs": true,
      "tara.keepCSLs": true,
      "tara.keepTranslators": true,
      "tara.keepLocale": true,
      "tara.exportPath": "C:/ZoteroBackUp/",
      "tara.exportProfile": true,
      "tara.exportData": true,
      "tara.exportSuccess": true,
    };

    for (let p in initPrefs) {
      if (typeof this._Addon._Zotero.Prefs.get(p) === "undefined") {
        this._Addon._Zotero.Prefs.set(p, initPrefs[p]);
      }
    }
  }

  public onUnInit(_Zotero): void {
    console.log(`${addonName}: uninit called`);
    _Zotero.debug(`${addonName}: uninit called`);
    //  Remove elements and do clean up
    this._Addon.views.unInitViews(_Zotero);
    // Remove addon object
    _Zotero.Tara = undefined;
  }
}

export default AddonEvents;
