/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import { IDisposable } from 'vs/base/common/lifecycle';
import { ThemeColor } from 'vs/platform/theme/common/themeService';
import { Event } from 'vs/base/common/event';

export const IStatusbarService = createDecorator<IStatusbarService>('statusbarService');

export const enum StatusbarAlignment {
	LEFT,
	RIGHT
}

/**
 * A declarative way of describing a status bar entry
 */
export interface IStatusbarEntry {

	/**
	 * The text to show for the entry. You can embed icons in the text by leveraging the syntax:
	 *
	 * `My text ${icon name} contains icons like ${icon name} this one.`
	 */
	readonly text: string;

	/**
	 * An optional tooltip text to show when you hover over the entry
	 */
	readonly tooltip?: string;

	/**
	 * An optional color to use for the entry
	 */
	readonly color?: string | ThemeColor;

	/**
	 * An optional background color to use for the entry
	 */
	readonly backgroundColor?: string | ThemeColor;

	/**
	 * An optional id of a command that is known to the workbench to execute on click
	 */
	readonly command?: string;

	/**
	 * Optional arguments for the command.
	 */
	readonly arguments?: any[];

	/**
	 * Wether to show a beak above the status bar entry.
	 */
	readonly showBeak?: boolean;
}

export interface IStatusbarService {

	_serviceBrand: undefined;

	readonly onDidChangeEntryVisibility: Event<{ id: string, visible: boolean }>;

	/**
	 * Adds an entry to the statusbar with the given alignment and priority. Use the returned accessor
	 * to update or remove the statusbar entry.
	 *
	 * @param id  identifier of the entry is needed to allow users to hide entries via settings
	 * @param name human readable name the entry is about
	 * @param alignment either LEFT or RIGHT
	 * @param priority items get arranged from highest priority to lowest priority from left to right
	 * in their respective alignment slot
	 */
	addEntry(entry: IStatusbarEntry, id: string, name: string, alignment: StatusbarAlignment, priority?: number): IStatusbarEntryAccessor;

	/**
	 * Allows to update an entry's visibility with the provided ID.
	 */
	updateEntryVisibility(id: string, visible: boolean): void;
}

export interface IStatusbarEntryAccessor extends IDisposable {

	/**
	 * Allows to update an existing status bar entry.
	 */
	update(properties: IStatusbarEntry): void;
}
